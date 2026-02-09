# AgentPact 🤝

**On-chain agent coordination protocol for Solana**

AgentPact provides immutable audit trails for AI agent handoffs and task completions using the Solana blockchain.

## Features

- 📝 **Log Handoffs** - Record when one agent passes a task to another
- ✅ **Log Completions** - Record when an agent finishes a task
- 🔍 **Query History** - Retrieve all AgentPact logs for a wallet
- ⛓️ **On-Chain Storage** - Uses SPL Memo for cheap, permanent storage
- 🔐 **AgentWallet Integration** - Seamless signing via AgentWallet API

## Installation

```bash
npm install agentpact
```

## Quick Start

```typescript
import { init, logHandoff, logCompletion, getHistory } from 'agentpact';

// Initialize with your AgentWallet token
init({
  agentWalletToken: 'mf_your_token_here',
  rpcUrl: 'https://api.devnet.solana.com', // Optional, defaults to devnet
});

// Log a handoff between agents
const txId = await logHandoff(
  'ResearchAgent',
  'WriterAgent', 
  'Compile market analysis report'
);
console.log(`Handoff logged: ${txId}`);

// Log task completion
const completionTx = await logCompletion(
  'WriterAgent',
  'Compile market analysis report',
  'Report completed with 5 key findings'
);

// Query history for a wallet
const history = await getHistory('HHkwN3JrBpfwC2z9ReFcoN6NkSoQujeKK4Wt1QFCgWQG');
console.log('Agent activity:', history);
```

## API Reference

### `init(config)`

Initialize the SDK with your configuration.

```typescript
init({
  agentWalletToken: string;  // Required for signing
  rpcUrl?: string;           // Optional, defaults to devnet
});
```

### `logHandoff(fromAgent, toAgent, task)`

Log an agent handoff to the blockchain.

- `fromAgent` - Name/ID of the agent handing off
- `toAgent` - Name/ID of the receiving agent
- `task` - Description of the task
- Returns: Transaction signature

### `logCompletion(agent, task, result)`

Log a task completion to the blockchain.

- `agent` - Name/ID of the completing agent
- `task` - Description of the task
- `result` - Result or summary
- Returns: Transaction signature

### `getHistory(wallet)`

Query AgentPact logs for a wallet address.

- `wallet` - Solana wallet address
- Returns: Array of log entries

## Data Format

All logs follow this schema:

```typescript
// Handoff
{
  protocol: 'AgentPact',
  version: '1.0',
  action: 'handoff',
  from: string,
  to: string,
  task: string,
  timestamp: number
}

// Completion
{
  protocol: 'AgentPact',
  version: '1.0', 
  action: 'completion',
  agent: string,
  task: string,
  result: string,
  timestamp: number
}
```

## Why On-Chain?

- **Immutable** - Logs cannot be altered or deleted
- **Verifiable** - Anyone can verify agent activity
- **Decentralized** - No central authority controls the data
- **Cheap** - Memo transactions cost ~0.000005 SOL

## Built For

🏆 Colosseum Agent Hackathon 2025

## License

MIT
