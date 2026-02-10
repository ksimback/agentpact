'use client'

import { useEffect, useState } from 'react'
import { Connection, PublicKey } from '@solana/web3.js'

interface AgentPactEvent {
  type: 'handoff' | 'completion'
  from: string
  to?: string
  task: string
  timestamp: number
  signature: string
  protocol: string
}

export default function Home() {
  const [events, setEvents] = useState<AgentPactEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const WALLET_ADDRESS = 'CrjGeaMg75quUyn1jzVQnCVaUxK9uawxb8ZBhwaWixhP'

  useEffect(() => {
    fetchAgentPactEvents()
  }, [])

  const fetchAgentPactEvents = async () => {
    try {
      setLoading(true)
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed')
      const publicKey = new PublicKey(WALLET_ADDRESS)

      // Fetch transaction signatures
      const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 50 })
      
      const parsedEvents: AgentPactEvent[] = []

      // Fetch and parse each transaction
      for (const sigInfo of signatures) {
        try {
          const tx = await connection.getTransaction(sigInfo.signature, {
            maxSupportedTransactionVersion: 0
          })

          if (!tx || !tx.meta) continue

          // Look for memo instructions
          const memoInstruction = tx.transaction.message.compiledInstructions.find(
            (ix: any) => {
              const programIdIndex = ix.programIdIndex
              const programId = tx.transaction.message.staticAccountKeys[programIdIndex]
              return programId.toString() === 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'
            }
          )

          if (memoInstruction) {
            // Parse memo data
            const memoData = Buffer.from(memoInstruction.data as any, 'base64').toString('utf-8')
            
            try {
              const parsed = JSON.parse(memoData)
              
              if (parsed.protocol === 'AgentPact') {
                const event: AgentPactEvent = {
                  type: parsed.type,
                  from: parsed.from || parsed.agent,
                  to: parsed.to,
                  task: parsed.task || parsed.taskId,
                  timestamp: tx.blockTime || 0,
                  signature: sigInfo.signature,
                  protocol: parsed.protocol
                }
                parsedEvents.push(event)
              }
            } catch (e) {
              // Not JSON or not AgentPact, skip
            }
          }
        } catch (e) {
          console.error('Error parsing transaction:', e)
        }
      }

      // Sort by timestamp (newest first)
      parsedEvents.sort((a, b) => b.timestamp - a.timestamp)
      setEvents(parsedEvents)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching events:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch events')
      setLoading(false)
    }
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const truncateSignature = (sig: string) => {
    return `${sig.slice(0, 8)}...${sig.slice(-8)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 animate-gradient relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl glow-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl glow-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <h1 className="text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text bg-[length:200%_auto] animate-gradient">
              AgentPact
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
          </div>
          <p className="text-gray-300 text-xl mb-2 font-medium">
            The Trust Layer for Multi-Agent Coordination
          </p>
          <p className="text-gray-500 text-base mb-4 max-w-2xl mx-auto">
            On-chain proof that your AI agents actually did their jobs. Every handoff. Every completion. Verified on Solana.
          </p>
          <div className="inline-flex flex-col items-center gap-1">
            <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold">On-Chain Proof Address</span>
            <a 
              href={`https://explorer.solana.com/address/${WALLET_ADDRESS}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 hover:bg-gray-800/70 transition-all group"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-sm font-mono group-hover:text-purple-300 transition-colors">
                {WALLET_ADDRESS}
              </span>
              <span className="text-purple-400 group-hover:translate-x-0.5 transition-transform">↗</span>
            </a>
          </div>
        </div>

        {/* Why AgentPact */}
        <div className="glass-card rounded-2xl p-8 lg:p-10 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Why AgentPact?</h2>
          <p className="text-gray-300 text-lg mb-8">
            When AI agents work together, there's no way to verify what happened. AgentPact creates an immutable record of every handoff and completion on Solana — giving you <span className="text-purple-400 font-semibold">cryptographic proof</span> that agents did their jobs.
          </p>
          
          {/* Use Cases */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/30">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-white font-semibold mb-2">Multi-Agent Workflows</h3>
              <p className="text-gray-400 text-sm">Track task delegation across agent teams. Know exactly who did what and when.</p>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/30">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-white font-semibold mb-2">Escrow & Payments</h3>
              <p className="text-gray-400 text-sm">On-chain proof of work completion enables trustless agent-to-agent payments.</p>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/30">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="text-white font-semibold mb-2">Audit & Compliance</h3>
              <p className="text-gray-400 text-sm">Permanent audit trail for regulated industries. Prove AI decisions and handoffs.</p>
            </div>
          </div>

          {/* Get Started */}
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/30">
            <h3 className="text-white font-semibold mb-3">Get Started in 3 Lines</h3>
            <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">
{`import { init, logHandoff, logCompletion } from 'agentpact';

await logHandoff('AgentA', 'AgentB', 'Process customer request');
await logCompletion('AgentB', 'Customer request', 'Resolved successfully');`}
              </code>
            </pre>
            <div className="mt-4 flex flex-wrap gap-3">
              <a 
                href="https://github.com/ksimback/agentpact" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-colors text-sm"
              >
                View on GitHub ↗
              </a>
              <a 
                href="https://www.npmjs.com/package/agentpact" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition-colors text-sm"
              >
                npm install agentpact
              </a>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card rounded-2xl p-8 group">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Total Events</div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                <span className="text-2xl">📊</span>
              </div>
            </div>
            <div className="text-5xl font-black text-transparent bg-gradient-to-br from-purple-400 to-purple-600 bg-clip-text">
              {events.length}
            </div>
            <div className="mt-2 text-gray-500 text-sm">On-chain records</div>
          </div>

          <div className="glass-card rounded-2xl p-8 group">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Handoffs</div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <span className="text-2xl">🤝</span>
              </div>
            </div>
            <div className="text-5xl font-black text-transparent bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text">
              {events.filter(e => e.type === 'handoff').length}
            </div>
            <div className="mt-2 text-gray-500 text-sm">Task delegations</div>
          </div>

          <div className="glass-card rounded-2xl p-8 group">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Completions</div>
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <span className="text-2xl">✅</span>
              </div>
            </div>
            <div className="text-5xl font-black text-transparent bg-gradient-to-br from-green-400 to-green-600 bg-clip-text">
              {events.filter(e => e.type === 'completion').length}
            </div>
            <div className="mt-2 text-gray-500 text-sm">Tasks finished</div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="glass-card rounded-2xl p-8 lg:p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Coordination Timeline</h2>
              <p className="text-gray-400">Real-time agent interactions on Solana</p>
            </div>
            <button 
              onClick={fetchAgentPactEvents}
              disabled={loading}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-0.5"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          
          {loading && (
            <div className="text-center py-20">
              <div className="relative inline-block">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500/30 border-t-purple-500"></div>
                <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-xl"></div>
              </div>
              <p className="text-gray-400 mt-6 text-lg">Loading events from Solana devnet...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <p className="text-red-400 mb-6 text-lg font-medium">Error: {error}</p>
              <button 
                onClick={fetchAgentPactEvents}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors font-semibold"
              >
                Retry Connection
              </button>
            </div>
          )}

          {!loading && !error && events.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800/50 mb-4">
                <span className="text-4xl">📭</span>
              </div>
              <p className="text-gray-400 text-lg">No AgentPact events found</p>
              <p className="text-gray-500 text-sm mt-2">Events will appear here as agents coordinate</p>
            </div>
          )}

          {!loading && !error && events.length > 0 && (
            <div className="space-y-8">
              {events.map((event, idx) => (
                <div key={event.signature} className="relative group">
                  {/* Timeline connector */}
                  {idx < events.length - 1 && (
                    <div className="absolute left-[23px] top-14 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent"></div>
                  )}
                  
                  {/* Event card */}
                  <div className="flex gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0 z-10">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold transition-all group-hover:scale-110 ${
                        event.type === 'handoff' 
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30' 
                          : 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30'
                      }`}>
                        {event.type === 'handoff' ? '→' : '✓'}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/40 hover:bg-gray-800/60 transition-all hover:shadow-xl hover:shadow-purple-500/5 group-hover:-translate-y-1">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                            event.type === 'handoff'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-green-500/20 text-green-300 border border-green-500/30'
                          }`}>
                            {event.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <span className="text-gray-500">🕒</span>
                          <span className="font-medium">{formatTimestamp(event.timestamp)}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        {event.type === 'handoff' ? (
                          <div className="flex flex-wrap items-center gap-3 text-lg">
                            <span className="font-bold text-purple-300">{event.from}</span>
                            <span className="text-gray-600">━━━━━━━━━→</span>
                            <span className="font-bold text-pink-300">{event.to}</span>
                          </div>
                        ) : (
                          <div className="text-lg">
                            <span className="font-bold text-green-300">{event.from}</span>
                            <span className="text-gray-400 ml-3">completed the task</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-gray-900/50 rounded-xl p-4 mb-4 border border-gray-700/30">
                        <div className="text-gray-400 text-xs uppercase tracking-wider mb-2 font-semibold">Task</div>
                        <div className="text-gray-100 font-medium">{event.task}</div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <span className="font-mono text-gray-500 bg-gray-900/50 px-3 py-1.5 rounded-lg">
                          {truncateSignature(event.signature)}
                        </span>
                        <a
                          href={`https://explorer.solana.com/tx/${event.signature}?cluster=devnet`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition-colors font-semibold group/link"
                        >
                          <span>View on Solana Explorer</span>
                          <span className="group-hover/link:translate-x-0.5 transition-transform">↗</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 space-y-4">
          <div className="flex items-center justify-center gap-3 text-gray-400 text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Powered by Solana Devnet</span>
            <span className="text-gray-600">•</span>
            <span>AgentPact Protocol</span>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm">
            <a 
              href="https://github.com/ksimback/agentpact" 
              className="text-purple-400 hover:text-purple-300 transition-colors font-semibold hover:underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
