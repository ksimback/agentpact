# AgentPact Demo Dashboard

A visual proof of multi-agent coordination on Solana, showcasing the AgentPact protocol in action.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/agentpact-dashboard)

[Live Demo](https://agentpact-dashboard.vercel.app) • [View Transactions](https://explorer.solana.com/address/HHkwN3JrBpfwC2z9ReFcoN6NkSoQujeKK4Wt1QFCgWQG?cluster=devnet)

## Features

- 🔗 **Live Solana Integration** - Fetches real AgentPact events from Solana devnet
- 📊 **Coordination Timeline** - Visual timeline showing handoffs and task completions
- 🌙 **Dark Mode Design** - Clean, modern UI with purple/pink gradient theme
- ⚡ **Real-time Stats** - Live counters for total events, handoffs, and completions
- 🔍 **Transaction Links** - Direct links to Solana Explorer for verification

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **@solana/web3.js** - Solana blockchain integration

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

### Build

```bash
npm run build
```

This creates an optimized static export in the `out/` directory.

## Deployment

### Deploy to Vercel (Recommended)

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel will auto-detect Next.js and deploy

**Or use Vercel CLI:**

```bash
npm i -g vercel
vercel
```

### Deploy to Other Platforms

Since this uses Next.js static export (`output: 'export'`), you can deploy the `out/` folder to:

- **Netlify**: Drag & drop the `out/` folder
- **GitHub Pages**: Push `out/` contents to `gh-pages` branch
- **Any static host**: Upload `out/` folder contents

## How It Works

### Data Flow

1. **Fetch Transactions** - Queries Solana devnet for transactions from the AgentPact wallet
2. **Parse Memos** - Extracts memo instructions containing AgentPact protocol data
3. **Decode Events** - Parses JSON memos to identify handoffs and completions
4. **Display Timeline** - Renders events chronologically with agent names and tasks

### AgentPact Protocol

The dashboard looks for memo transactions with this structure:

**Handoff:**
```json
{
  "protocol": "AgentPact",
  "type": "handoff",
  "from": "Clawd",
  "to": "Trevor",
  "task": "AgentPact SDK testing"
}
```

**Completion:**
```json
{
  "protocol": "AgentPact",
  "type": "completion",
  "agent": "Trevor",
  "taskId": "AgentPact SDK testing"
}
```

## Wallet Address

Currently tracking: `HHkwN3JrBpfwC2z9ReFcoN6NkSoQujeKK4Wt1QFCgWQG`

To change the wallet, edit `WALLET_ADDRESS` in `app/page.tsx`.

## Known Transactions

The dashboard will display these real transactions:

1. **Handoff**: Clawd → Trevor for "AgentPact SDK testing"
   - TX: `2uF8fJK7XJbV4Q7xiasAi9JzFEnjzPrVyatNERD8ydnRrTtgUA53XM5suAUKeW4dbaodgcDP2mEeKgzVxdeQWhDL`

2. **Completion**: Trevor completed "AgentPact SDK testing"
   - TX: `5UuVtgWUopwZjD1neVqULeD1xWgYHt8MJvYAvYJMa8mJDpbRy7UU1sHApTJ82cDxobBuhAdpmpSHSSsYFAU4UrCX`

## Customization

### Change Theme Colors

Edit `app/globals.css` and Tailwind classes in `app/page.tsx`:

- Primary: `purple-400/500`
- Secondary: `pink-400`
- Handoff: `blue-400/500`
- Completion: `green-400/500`

### Add More Features

Ideas for enhancement:
- Filter by agent name
- Search transactions
- Export timeline as image
- Add more event types (errors, retries, etc.)
- Real-time updates with WebSockets

## Troubleshooting

**Error: Failed to fetch events**
- Check internet connection
- Verify Solana devnet is accessible
- Try refreshing the page

**No events showing**
- Ensure the wallet has AgentPact transactions
- Check that memos use the correct protocol format
- View browser console for parsing errors

## License

MIT

## Hackathon Submission

Built for the AgentPact hackathon - demonstrating multi-agent coordination on Solana.

**Deadline**: February 12, 2025
