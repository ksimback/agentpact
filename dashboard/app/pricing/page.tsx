'use client'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <a href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-4 inline-block">
            ← Back to Dashboard
          </a>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            AgentPact Pricing
          </h1>
          <p className="text-gray-400 text-lg">
            Agent-native micropayments via x402
          </p>
        </div>

        {/* x402 Pay-Per-Call Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
              ⚡
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-200">x402 Pay-Per-Call</h2>
              <p className="text-green-400 text-sm">Agent-Native • No API Keys • USDC on Solana</p>
            </div>
          </div>

          <p className="text-gray-300 mb-6">
            AgentPact uses <a href="https://x402.org" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">x402</a> for 
            frictionless micropayments. Agents pay per-call with USDC — no accounts, no API keys, no subscriptions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">$0.001</div>
              <div className="text-gray-400 text-sm">Log Handoff</div>
              <div className="text-gray-500 text-xs mt-1">Record task delegation</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">$0.001</div>
              <div className="text-gray-400 text-sm">Log Completion</div>
              <div className="text-gray-500 text-xs mt-1">Record task finish</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">$0.0005</div>
              <div className="text-gray-400 text-sm">Get History</div>
              <div className="text-gray-500 text-xs mt-1">Query coordination logs</div>
            </div>
          </div>

          <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700/50">
            <h3 className="text-gray-300 font-semibold mb-2">How It Works</h3>
            <ol className="text-gray-400 text-sm space-y-2">
              <li>1. Agent sends request with USDC payment header</li>
              <li>2. AgentPact verifies payment via x402</li>
              <li>3. Action logged to Solana, proof returned</li>
              <li>4. No accounts, no rate limits, no setup</li>
            </ol>
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-200 mb-4">Current Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <div>
                <div className="text-gray-200">On-chain handoff logging</div>
                <div className="text-gray-500 text-sm">Solana memo proofs</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <div>
                <div className="text-gray-200">On-chain completion logging</div>
                <div className="text-gray-500 text-sm">Verifiable task records</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <div>
                <div className="text-gray-200">Coordination history</div>
                <div className="text-gray-500 text-sm">Query past handoffs</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-400 text-xl">✓</span>
              <div>
                <div className="text-gray-200">x402 micropayments</div>
                <div className="text-gray-500 text-sm">USDC on Solana</div>
              </div>
            </div>
          </div>
        </div>

        {/* Open Source Note */}
        <div className="text-center text-gray-500 text-sm">
          <p>AgentPact is open source. Run your own node, or use the hosted service.</p>
          <p className="mt-2">
            <a 
              href="https://github.com/ksimback/agentpact" 
              className="text-purple-400 hover:text-purple-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub →
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
