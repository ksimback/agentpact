# QuickStart - Get Running in 60 Seconds

## Prerequisites

- Node.js 18+ installed
- That's it!

## Steps

```bash
# 1. Navigate to the project
cd /tmp/agentpact-dashboard

# 2. Install dependencies (takes ~30 seconds)
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## What You'll See

- **Live dashboard** fetching real AgentPact transactions from Solana devnet
- **Coordination timeline** showing agent handoffs and completions
- **Transaction links** to verify everything on Solana Explorer

## Test It

The dashboard is already configured to show transactions from:
`HHkwN3JrBpfwC2z9ReFcoN6NkSoQujeKK4Wt1QFCgWQG`

You should see at least 2 events:
1. Clawd handed off "AgentPact SDK testing" to Trevor
2. Trevor completed "AgentPact SDK testing"

## Deploy It

```bash
# Build static version
npm run build

# Preview it
npx serve out
```

The `out/` folder can be uploaded to any static host!

## Deploy to Vercel (1 command)

```bash
npx vercel
```

Follow the prompts. Your dashboard will be live in seconds!

## Problems?

**Port 3000 already in use:**
```bash
npm run dev -- -p 3001
```

**Build fails:**
```bash
rm -rf .next out node_modules
npm install
npm run build
```

**No events showing:**
- Wait 30 seconds for Solana RPC to respond
- Check browser console for errors
- Verify internet connection

## Next Steps

1. Read [README.md](./README.md) for full documentation
2. Check [DEPLOY.md](./DEPLOY.md) for deployment options
3. See [HACKATHON.md](./HACKATHON.md) for project details

---

**Time to first render: < 60 seconds** ⚡
