/**
 * AgentPact SDK Test - Real Solana Devnet Transaction
 * 
 * Tests the AgentPact protocol by logging agent handoffs to Solana devnet.
 */

import { init, logHandoff, logCompletion, getHistory } from './index';
import { Keypair } from '@solana/web3.js';

// Pre-funded devnet keypair (funded via AgentWallet transfer)
const KEYPAIR_SECRET = 'pRGWaoLFljq7chUXYAt0cRJih7cHhJ9iIItISPyfNPywLc947iUelvXkcSTS/EXoOVaxk07VmAZ4mx1sFMPsOg==';

async function main() {
  console.log('🚀 AgentPact SDK Test');
  console.log('='.repeat(50));
  
  // Load the pre-funded keypair
  console.log('\n🔧 Loading devnet keypair...');
  const keypair = Keypair.fromSecretKey(Buffer.from(KEYPAIR_SECRET, 'base64'));
  console.log(`   Wallet: ${keypair.publicKey.toBase58()}`);
  
  // Initialize SDK with the keypair
  init({
    rpcUrl: 'https://api.devnet.solana.com',
    keypair: keypair,
  });
  
  console.log(`   Network: Solana Devnet`);
  
  try {
    // Test 1: Log a handoff from Clawd to Trevor
    console.log('\n🤝 Test 1: Logging handoff Clawd → Trevor');
    const handoffTxId = await logHandoff(
      'Clawd',
      'Trevor',
      'AgentPact SDK testing'
    );
    
    // Test 2: Log task completion
    console.log('\n✅ Test 2: Logging task completion');
    const completionTxId = await logCompletion(
      'Trevor',
      'AgentPact SDK testing',
      'SDK validated with real devnet transaction'
    );
    
    // Wait for transactions to be fully confirmed
    console.log('\n⏳ Waiting for transaction confirmation...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Test 3: Query history
    console.log('\n📜 Test 3: Querying AgentPact history');
    const history = await getHistory(keypair.publicKey.toBase58());
    console.log(`   Found ${history.length} AgentPact logs`);
    history.forEach((log, i) => {
      if (log.action === 'handoff') {
        console.log(`   ${i + 1}. Handoff: ${log.from} → ${log.to} | Task: ${log.task}`);
      } else {
        console.log(`   ${i + 1}. Completion: ${log.agent} | Result: ${log.result}`);
      }
    });
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 All tests passed!');
    console.log(`\nView transactions on Solana Explorer (devnet):`);
    console.log(`   Handoff: https://explorer.solana.com/tx/${handoffTxId}?cluster=devnet`);
    console.log(`   Completion: https://explorer.solana.com/tx/${completionTxId}?cluster=devnet`);
    console.log(`   Wallet: https://explorer.solana.com/address/${keypair.publicKey.toBase58()}?cluster=devnet`);
    
    // Output for CI/automation
    console.log('\n📊 Results Summary:');
    console.log(`HANDOFF_TX=${handoffTxId}`);
    console.log(`COMPLETION_TX=${completionTxId}`);
    console.log(`WALLET=${keypair.publicKey.toBase58()}`);
    
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  }
}

main();
