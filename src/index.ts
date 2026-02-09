/**
 * AgentPact SDK - On-Chain Agent Coordination Protocol
 * 
 * Logs agent handoffs and task completions to Solana blockchain
 * using the SPL Memo program for immutable audit trails.
 */

import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
  Keypair,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import bs58 from 'bs58';

// SPL Memo Program
const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');

// Default to devnet
const DEFAULT_RPC = 'https://api.devnet.solana.com';
const AGENTWALLET_API = 'https://agentwallet.mcpay.tech/api';

export interface AgentPactConfig {
  rpcUrl?: string;
  // Mode 1: Local keypair (for devnet testing)
  keypair?: Keypair;
  privateKey?: string;  // Base58 encoded private key
  // Mode 2: AgentWallet API (for future - requires transaction signing support)
  agentWalletToken?: string;
  agentWalletUsername?: string;
}

export interface HandoffLog {
  protocol: 'AgentPact';
  version: '1.0';
  action: 'handoff';
  from: string;
  to: string;
  task: string;
  timestamp: number;
}

export interface CompletionLog {
  protocol: 'AgentPact';
  version: '1.0';
  action: 'completion';
  agent: string;
  task: string;
  result: string;
  timestamp: number;
}

export type AgentPactLog = HandoffLog | CompletionLog;

let config: AgentPactConfig = {
  rpcUrl: DEFAULT_RPC,
};

/**
 * Initialize the AgentPact SDK
 */
export function init(options: AgentPactConfig): void {
  config = { ...config, ...options };
  
  // Convert private key to keypair if provided
  if (options.privateKey && !options.keypair) {
    config.keypair = Keypair.fromSecretKey(bs58.decode(options.privateKey));
  }
}

/**
 * Get Solana connection
 */
function getConnection(): Connection {
  return new Connection(config.rpcUrl || DEFAULT_RPC, 'confirmed');
}

/**
 * Create a memo instruction with AgentPact data
 */
function createMemoInstruction(data: AgentPactLog): TransactionInstruction {
  const memoData = JSON.stringify(data);
  
  return new TransactionInstruction({
    programId: MEMO_PROGRAM_ID,
    keys: [],
    data: Buffer.from(memoData, 'utf-8'),
  });
}

/**
 * Get or create a funded keypair for devnet
 */
export async function getOrCreateDevnetKeypair(): Promise<Keypair> {
  const connection = getConnection();
  const keypair = Keypair.generate();
  
  console.log(`🔑 Generated new devnet keypair: ${keypair.publicKey.toBase58()}`);
  console.log('   Requesting airdrop...');
  
  try {
    const signature = await connection.requestAirdrop(keypair.publicKey, 0.1 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(signature);
    console.log('   ✅ Airdrop successful (0.1 SOL)');
  } catch (error) {
    console.log('   ⚠️ Airdrop failed - you may need to fund manually');
  }
  
  return keypair;
}

/**
 * Sign and send transaction using local keypair
 */
async function signWithLocalKeypair(
  transaction: Transaction,
  connection: Connection
): Promise<string> {
  if (!config.keypair) {
    throw new Error('No keypair configured. Call init() with keypair or privateKey.');
  }

  transaction.feePayer = config.keypair.publicKey;
  
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.lastValidBlockHeight = lastValidBlockHeight;

  const txId = await sendAndConfirmTransaction(connection, transaction, [config.keypair]);
  return txId;
}

/**
 * Sign and send transaction using AgentWallet API
 * NOTE: AgentWallet currently doesn't support transaction signing.
 * This is a placeholder for future support.
 */
async function signWithAgentWallet(
  transaction: Transaction,
  connection: Connection
): Promise<string> {
  if (!config.agentWalletToken || !config.agentWalletUsername) {
    throw new Error('AgentWallet credentials required. Call init() with agentWalletToken and agentWalletUsername.');
  }

  // Get the wallet's Solana address
  const walletResponse = await fetch(`${AGENTWALLET_API}/wallets/${config.agentWalletUsername}`);
  if (!walletResponse.ok) {
    throw new Error(`Failed to fetch wallet info: ${await walletResponse.text()}`);
  }
  const walletInfo = await walletResponse.json() as { solanaAddress: string };
  const signerPubkey = new PublicKey(walletInfo.solanaAddress);
  
  transaction.feePayer = signerPubkey;

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.lastValidBlockHeight = lastValidBlockHeight;

  // Serialize transaction for signing
  const serializedTx = transaction.serializeMessage().toString('base64');
  
  // NOTE: AgentWallet's sign-message endpoint signs arbitrary messages,
  // not Solana transactions. This will NOT work until AgentWallet adds
  // a proper sign-transaction endpoint.
  //
  // For now, throw an informative error.
  throw new Error(
    'AgentWallet transaction signing not yet supported. ' +
    'AgentWallet needs to add a sign-transaction endpoint. ' +
    'Use local keypair mode for devnet testing instead.'
  );
}

/**
 * Sign and send a transaction using the configured method
 */
async function signAndSend(
  transaction: Transaction,
  connection: Connection
): Promise<string> {
  // Prefer local keypair if available
  if (config.keypair) {
    return signWithLocalKeypair(transaction, connection);
  }
  
  // Try AgentWallet
  if (config.agentWalletToken && config.agentWalletUsername) {
    return signWithAgentWallet(transaction, connection);
  }
  
  throw new Error(
    'No signing method configured. Call init() with either:\n' +
    '  - keypair or privateKey (for devnet testing)\n' +
    '  - agentWalletToken and agentWalletUsername (future support)'
  );
}

/**
 * Log an agent handoff to the blockchain
 * 
 * @param fromAgent - The agent handing off the task
 * @param toAgent - The agent receiving the task
 * @param task - Description of the task being handed off
 * @returns Transaction signature (txId)
 */
export async function logHandoff(
  fromAgent: string,
  toAgent: string,
  task: string
): Promise<string> {
  const connection = getConnection();

  const logData: HandoffLog = {
    protocol: 'AgentPact',
    version: '1.0',
    action: 'handoff',
    from: fromAgent,
    to: toAgent,
    task: task,
    timestamp: Date.now(),
  };

  const instruction = createMemoInstruction(logData);
  const transaction = new Transaction().add(instruction);

  const txId = await signAndSend(transaction, connection);
  
  console.log(`📝 AgentPact: Handoff logged | ${fromAgent} → ${toAgent}`);
  console.log(`   Task: ${task}`);
  console.log(`   Tx: https://explorer.solana.com/tx/${txId}?cluster=devnet`);

  return txId;
}

/**
 * Log a task completion to the blockchain
 * 
 * @param agent - The agent that completed the task
 * @param task - Description of the completed task
 * @param result - Result or summary of completion
 * @returns Transaction signature (txId)
 */
export async function logCompletion(
  agent: string,
  task: string,
  result: string
): Promise<string> {
  const connection = getConnection();

  const logData: CompletionLog = {
    protocol: 'AgentPact',
    version: '1.0',
    action: 'completion',
    agent: agent,
    task: task,
    result: result,
    timestamp: Date.now(),
  };

  const instruction = createMemoInstruction(logData);
  const transaction = new Transaction().add(instruction);

  const txId = await signAndSend(transaction, connection);
  
  console.log(`✅ AgentPact: Completion logged | ${agent}`);
  console.log(`   Task: ${task}`);
  console.log(`   Result: ${result}`);
  console.log(`   Tx: https://explorer.solana.com/tx/${txId}?cluster=devnet`);

  return txId;
}

/**
 * Get AgentPact history for a wallet by querying memo transactions
 * 
 * @param wallet - Solana wallet address to query
 * @returns Array of AgentPact log entries
 */
export async function getHistory(wallet: string): Promise<AgentPactLog[]> {
  const connection = getConnection();
  const pubkey = new PublicKey(wallet);

  const signatures = await connection.getSignaturesForAddress(pubkey, {
    limit: 100,
  });

  const logs: AgentPactLog[] = [];

  for (const sig of signatures) {
    try {
      const tx = await connection.getParsedTransaction(sig.signature, {
        maxSupportedTransactionVersion: 0,
      });

      if (!tx?.meta?.logMessages) continue;

      for (const log of tx.meta.logMessages) {
        if (log.includes('Program log: Memo')) {
          const memoMatch = log.match(/Memo \(len \d+\): "(.*?)"/);
          if (memoMatch) {
            try {
              const data = JSON.parse(memoMatch[1]);
              if (data.protocol === 'AgentPact') {
                logs.push(data as AgentPactLog);
              }
            } catch {
              // Not JSON or not AgentPact
            }
          }
        }
      }
    } catch {
      // Skip failed transaction fetches
    }
  }

  return logs;
}

/**
 * Create a handoff log without submitting (for inspection/testing)
 */
export function createHandoffLog(
  fromAgent: string,
  toAgent: string,
  task: string
): HandoffLog {
  return {
    protocol: 'AgentPact',
    version: '1.0',
    action: 'handoff',
    from: fromAgent,
    to: toAgent,
    task: task,
    timestamp: Date.now(),
  };
}

/**
 * Create a completion log without submitting (for inspection/testing)
 */
export function createCompletionLog(
  agent: string,
  task: string,
  result: string
): CompletionLog {
  return {
    protocol: 'AgentPact',
    version: '1.0',
    action: 'completion',
    agent: agent,
    task: task,
    result: result,
    timestamp: Date.now(),
  };
}

export default {
  init,
  logHandoff,
  logCompletion,
  getHistory,
  getOrCreateDevnetKeypair,
  createHandoffLog,
  createCompletionLog,
};
