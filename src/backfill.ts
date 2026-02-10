/**
 * AgentPact Backfill - Log today's coordination activity
 */

import { init, logHandoff, logCompletion } from './index';
import { Keypair } from '@solana/web3.js';

// Pre-funded devnet keypair
const KEYPAIR_SECRET = 'pRGWaoLFljq7chUXYAt0cRJih7cHhJ9iIItISPyfNPywLc947iUelvXkcSTS/EXoOVaxk07VmAZ4mx1sFMPsOg==';

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('🔄 AgentPact Backfill - Logging today\'s coordination\n');
  
  // Load keypair
  const keypair = Keypair.fromSecretKey(Buffer.from(KEYPAIR_SECRET, 'base64'));
  console.log(`Wallet: ${keypair.publicKey.toBase58()}\n`);
  
  init({
    rpcUrl: 'https://api.devnet.solana.com',
    keypair: keypair,
  });
  
  const transactions: string[] = [];
  
  try {
    // 1. Pricing page investigation
    console.log('1️⃣ Logging: Clawd → Pricing page investigation');
    let tx = await logHandoff('Kevin', 'Clawd', 'Investigate and fix AgentPact pricing page');
    transactions.push(tx);
    await sleep(2000);
    
    // 2. Clawd completes investigation
    console.log('2️⃣ Logging: Clawd completed investigation');
    tx = await logCompletion('Clawd', 'Investigate pricing page', 'Found pricing page belongs to different Vercel account - not our project');
    transactions.push(tx);
    await sleep(2000);
    
    // 3. Handoff to Pixel for redesign
    console.log('3️⃣ Logging: Clawd → Pixel for dashboard redesign');
    tx = await logHandoff('Clawd', 'Pixel', 'Redesign AgentPact dashboard with modern aesthetic');
    transactions.push(tx);
    await sleep(2000);
    
    // 4. Pixel completes redesign
    console.log('4️⃣ Logging: Pixel completed redesign');
    tx = await logCompletion('Pixel', 'Dashboard redesign', 'Added glassmorphism, animated gradients, polished UI');
    transactions.push(tx);
    await sleep(2000);
    
    // 5. Handoff to Stratton for x402 analysis
    console.log('5️⃣ Logging: Clawd → Stratton for strategic analysis');
    tx = await logHandoff('Clawd', 'Stratton', 'Analyze if x402 makes sense for AgentPact hackathon');
    transactions.push(tx);
    await sleep(2000);
    
    // 6. Stratton completes analysis
    console.log('6️⃣ Logging: Stratton completed analysis');
    tx = await logCompletion('Stratton', 'x402 strategic analysis', 'Recommendation: Skip x402, focus on coordination. Pricing is distraction.');
    transactions.push(tx);
    await sleep(2000);
    
    // 7. Clawd deploys final version
    console.log('7️⃣ Logging: Clawd deployment task');
    tx = await logCompletion('Clawd', 'Dashboard deployment', 'Deployed clean dashboard to agentpact-nu.vercel.app');
    transactions.push(tx);
    
    console.log('\n✅ Backfill complete! Logged', transactions.length, 'events');
    console.log('\n📊 Transactions:');
    transactions.forEach((txId, i) => {
      console.log(`   ${i + 1}. https://explorer.solana.com/tx/${txId}?cluster=devnet`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
