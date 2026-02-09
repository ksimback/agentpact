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

  const WALLET_ADDRESS = 'HHkwN3JrBpfwC2z9ReFcoN6NkSoQujeKK4Wt1QFCgWQG'

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            AgentPact
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            Multi-Agent Coordination on Solana
          </p>
          <p className="text-gray-500 text-sm font-mono">
            {WALLET_ADDRESS}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Total Events</div>
            <div className="text-3xl font-bold text-purple-400">{events.length}</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Handoffs</div>
            <div className="text-3xl font-bold text-blue-400">
              {events.filter(e => e.type === 'handoff').length}
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-1">Completions</div>
            <div className="text-3xl font-bold text-green-400">
              {events.filter(e => e.type === 'completion').length}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-200">Coordination Timeline</h2>
          
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
              <p className="text-gray-400 mt-4">Loading events from Solana devnet...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-red-400">Error: {error}</p>
              <button 
                onClick={fetchAgentPactEvents}
                className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No AgentPact events found</p>
            </div>
          )}

          {!loading && !error && events.length > 0 && (
            <div className="space-y-6">
              {events.map((event, idx) => (
                <div key={event.signature} className="relative">
                  {/* Timeline line */}
                  {idx < events.length - 1 && (
                    <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/50 to-transparent"></div>
                  )}
                  
                  {/* Event card */}
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      event.type === 'handoff' 
                        ? 'bg-blue-500/20 border-2 border-blue-500' 
                        : 'bg-green-500/20 border-2 border-green-500'
                    }`}>
                      {event.type === 'handoff' ? '→' : '✓'}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 hover:border-purple-500/30 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-2 ${
                            event.type === 'handoff'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {event.type.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-gray-500 text-sm">
                          {formatTimestamp(event.timestamp)}
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        {event.type === 'handoff' ? (
                          <div className="text-gray-200">
                            <span className="font-semibold text-purple-400">{event.from}</span>
                            <span className="text-gray-500 mx-2">→</span>
                            <span className="font-semibold text-pink-400">{event.to}</span>
                          </div>
                        ) : (
                          <div className="text-gray-200">
                            <span className="font-semibold text-green-400">{event.from}</span>
                            <span className="text-gray-500 ml-2">completed</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-gray-300 mb-3">
                        Task: <span className="font-medium">{event.task}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="font-mono">{truncateSignature(event.signature)}</span>
                        <a
                          href={`https://explorer.solana.com/tx/${event.signature}?cluster=devnet`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          View on Explorer ↗
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
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Powered by Solana Devnet • AgentPact Protocol</p>
          <p className="mt-2">
            <a 
              href="https://github.com/yourusername/agentpact" 
              className="text-purple-400 hover:text-purple-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more about AgentPact →
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
