# Quick Deployment Guide

## Option 1: Deploy to Vercel (Easiest)

### Method A: Using GitHub

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial AgentPact dashboard"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Click "Deploy"
   - Done! Your dashboard is live

### Method B: Using Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts. Vercel will automatically detect Next.js and deploy.

## Option 2: Deploy Static Build

The `out/` folder contains a static build that can be deployed anywhere:

### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=out
```

### GitHub Pages
```bash
# Build
npm run build

# Deploy (requires gh-pages package)
npm i -g gh-pages
gh-pages -d out
```

### Any Static Host
Just upload the contents of the `out/` folder to any static hosting:
- AWS S3
- Cloudflare Pages
- Azure Static Web Apps
- DigitalOcean App Platform

## Option 3: Run Locally

```bash
# Development server
npm run dev

# Or build and preview
npm run build
npx serve out
```

## Environment Variables

No environment variables required! The wallet address is hardcoded for demo purposes.

To change it, edit `WALLET_ADDRESS` in `app/page.tsx`.

## Troubleshooting

**Build fails:**
- Run `npm install` first
- Check Node.js version (requires 18+)
- Delete `.next` and `out` folders, rebuild

**CORS errors:**
- This shouldn't happen with Solana's public RPC
- If it does, deploy to a real domain (not localhost)

**No events showing:**
- Verify the wallet has AgentPact transactions on devnet
- Check browser console for errors
- Try refreshing after 30 seconds

## Performance Tips

- The dashboard fetches up to 50 recent transactions
- Caching is handled by Next.js automatically
- Static build means instant page loads
- No backend required!

## Custom Domain

After deploying to Vercel:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Questions?

Check the main [README.md](./README.md) for more details.
