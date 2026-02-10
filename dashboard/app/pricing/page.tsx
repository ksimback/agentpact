'use client'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 animate-gradient relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl glow-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl glow-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Dashboard</span>
          </a>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <h1 className="text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient">
              AgentPact Pricing
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
          </div>
          <p className="text-gray-300 text-xl font-medium">
            Agent-native micropayments via x402
          </p>
          <p className="text-gray-400 text-sm mt-2">
            No accounts • No API keys • Pay per call with USDC
          </p>
        </div>

        {/* x402 Hero Card */}
        <div className="glass-card rounded-3xl p-8 lg:p-10 mb-10 relative overflow-hidden">
          {/* Accent gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-2xl shadow-lg shadow-green-500/30">
                ⚡
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">x402 Pay-Per-Call</h2>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-sm">
                  <span className="px-2.5 py-1 bg-green-500/20 text-green-300 rounded-lg font-semibold border border-green-500/30">Agent-Native</span>
                  <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded-lg font-semibold border border-blue-500/30">No API Keys</span>
                  <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-lg font-semibold border border-purple-500/30">USDC on Solana</span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              AgentPact uses <a href="https://x402.org" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-4">x402</a> for 
              frictionless micropayments. Agents pay per-call with USDC — no accounts, no API keys, no subscriptions.
            </p>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700/50 hover:border-green-500/30 transition-all hover:shadow-lg hover:shadow-green-500/10 group">
                <div className="text-4xl font-black text-transparent bg-gradient-to-br from-green-400 to-green-600 bg-clip-text mb-2">
                  $0.001
                </div>
                <div className="text-white font-bold mb-2">Log Handoff</div>
                <div className="text-gray-400 text-sm leading-relaxed">
                  Record task delegation between agents
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700/50 hover:border-green-500/30 transition-all hover:shadow-lg hover:shadow-green-500/10 group">
                <div className="text-4xl font-black text-transparent bg-gradient-to-br from-green-400 to-green-600 bg-clip-text mb-2">
                  $0.001
                </div>
                <div className="text-white font-bold mb-2">Log Completion</div>
                <div className="text-gray-400 text-sm leading-relaxed">
                  Record task completion with proof
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700/50 hover:border-green-500/30 transition-all hover:shadow-lg hover:shadow-green-500/10 group">
                <div className="text-4xl font-black text-transparent bg-gradient-to-br from-green-400 to-green-600 bg-clip-text mb-2">
                  $0.0005
                </div>
                <div className="text-white font-bold mb-2">Get History</div>
                <div className="text-gray-400 text-sm leading-relaxed">
                  Query coordination logs and proofs
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-xl">🔄</span>
                <span>How It Works</span>
              </h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-bold border border-purple-500/30">1</span>
                  <span>Agent sends request with USDC payment header</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-bold border border-purple-500/30">2</span>
                  <span>AgentPact verifies payment via x402 protocol</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-bold border border-purple-500/30">3</span>
                  <span>Action logged to Solana blockchain, proof returned</span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-bold border border-purple-500/30">4</span>
                  <span>No accounts, no rate limits, no setup required</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="glass-card rounded-3xl p-8 lg:p-10 mb-10">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-3xl">✨</span>
            <span>Current Capabilities</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <span className="text-green-400 text-xl font-bold">✓</span>
              </div>
              <div>
                <div className="text-white font-bold mb-1">On-chain Handoff Logging</div>
                <div className="text-gray-400 text-sm">Immutable Solana memo proofs for task delegations</div>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <span className="text-green-400 text-xl font-bold">✓</span>
              </div>
              <div>
                <div className="text-white font-bold mb-1">On-chain Completion Logging</div>
                <div className="text-gray-400 text-sm">Verifiable task completion records with timestamps</div>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <span className="text-green-400 text-xl font-bold">✓</span>
              </div>
              <div>
                <div className="text-white font-bold mb-1">Coordination History</div>
                <div className="text-gray-400 text-sm">Query and audit all past agent interactions</div>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <span className="text-green-400 text-xl font-bold">✓</span>
              </div>
              <div>
                <div className="text-white font-bold mb-1">x402 Micropayments</div>
                <div className="text-gray-400 text-sm">Seamless USDC payments on Solana network</div>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <span className="text-green-400 text-xl font-bold">✓</span>
              </div>
              <div>
                <div className="text-white font-bold mb-1">Zero Setup</div>
                <div className="text-gray-400 text-sm">No accounts or API keys required to start</div>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <span className="text-green-400 text-xl font-bold">✓</span>
              </div>
              <div>
                <div className="text-white font-bold mb-1">Transparent Pricing</div>
                <div className="text-gray-400 text-sm">Pay only for what you use, no hidden fees</div>
              </div>
            </div>
          </div>
        </div>

        {/* Open Source Banner */}
        <div className="glass-card rounded-3xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shadow-lg shadow-purple-500/30">
            <span className="text-3xl">🌟</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Open Source & Self-Hostable</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            AgentPact is completely open source. Run your own node with full control, or use our hosted service for instant access.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="https://github.com/ksimback/agentpact" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View on GitHub</span>
              <span>↗</span>
            </a>
            <a 
              href="https://x402.org" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-purple-500/50 rounded-xl font-bold transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Learn about x402</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 space-y-3">
          <div className="flex items-center justify-center gap-3 text-gray-400 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Powered by Solana • Built with x402</span>
          </div>
        </div>
      </div>
    </div>
  )
}
