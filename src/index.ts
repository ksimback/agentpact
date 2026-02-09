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
} from '@solana/web3.js';

// SPL Memo Program
const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');

// Default to devnet
const DEFAULT_RPC = 'https://api.devnet.solana.com';

export interface AgentPactConfig {
  rpcUrl?: string;
  walletPrivateKey?: string;  // Base58 or Uint8Array
  agentWalletToken?: string;  // For AgentWallet API signing
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
 * Sign and send transaction using AgentWallet API
 */
async function signWithAgentWallet(
  transaction: Transaction,
  connection: Connection
): Promise<string> {
  if (!config.agentWalletToken) {
    throw new Error('AgentWallet token required. Call init() with agentWalletToken.');
  }

  // Get recent blockhash
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.lastValidBlockHeight = lastValidBlockHeight;

  // Serialize transaction for signing
  const serializedTx = transaction.serializeMessage().toString('base64');

  // Call AgentWallet API to sign
  const response = await fetch('https://agentwallet.ai/api/wallets/sign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.agentWalletToken}`,
    },
    body: JSON.stringify({
      chain: 'solana',
      message: serializedTx,
      encoding: 'base64',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`AgentWallet signing failed: ${error}`);
  }

  const result = await response.json();
  
  // Send the signed transaction
  const signedTx = Transaction.from(Buffer.from(result.signature, 'base64'));
  const txId = await connection.sendRawTransaction(signedTx.serialize());
  
  await connection.confirmTransaction({
    signature: txId,
    blockhash,
    lastValidBlockHeight,
  });

  return txId;
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

  // Use AgentWallet for signing
  const txId = await signWithAgentWallet(transaction, connection);
  
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

  const txId = await signWithAgentWallet(transaction, connection);
  
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

  // Get recent transaction signatures
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

      // Look for memo program logs
      for (const log of tx.meta.logMessages) {
        if (log.includes('Program log: Memo')) {
          // Extract memo data
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
  createHandoffLog,
  createCompletionLog,
};
