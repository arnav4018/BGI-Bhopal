'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Factory, Plus, TrendingUp, Award } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface Credit {
  id: number
  producer: string
  hydrogenAmount: number
  timestamp: number
  currentOwner: string
  isRetired: boolean
  isVerified: boolean
}

export default function ProducerDashboard() {
  const [hydrogenAmount, setHydrogenAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [credits, setCredits] = useLocalStorage<Credit[]>('credits', [])
  const [nextId, setNextId] = useLocalStorage<number>('nextCreditId', 1)
  const [producerAddress] = useState('0x1234...5678') // Simulated address

  const handleIssueCredit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hydrogenAmount || parseFloat(hydrogenAmount) <= 0) return

    setIsLoading(true)
    
    // Simulate blockchain transaction delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const newCredit: Credit = {
      id: nextId,
      producer: producerAddress,
      hydrogenAmount: parseFloat(hydrogenAmount),
      timestamp: Date.now(),
      currentOwner: producerAddress,
      isRetired: false,
      isVerified: false
    }

    setCredits([...credits, newCredit])
    setNextId(nextId + 1)
    setHydrogenAmount('')
    setIsLoading(false)
  }

  const myCredits = credits.filter(credit => credit.producer === producerAddress)
  const totalHydrogen = myCredits.reduce((sum, credit) => sum + credit.hydrogenAmount, 0)
  const activeCredits = myCredits.filter(credit => !credit.isRetired).length
  const verifiedCredits = myCredits.filter(credit => credit.isVerified).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 mb-12"
      >
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full px-6 py-3 border border-blue-200">
          <Factory className="w-6 h-6 text-blue-600" />
          <span className="text-sm font-semibold text-blue-800">Production Control Center</span>
        </div>
        
        <h1 className="text-6xl font-black text-gray-900">
          Producer <span className="gradient-text">Dashboard</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Transform your green hydrogen production into verified, tradeable credits with our intelligent platform
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="grid md:grid-cols-4 gap-8"
      >
        <motion.div 
          whileHover={{ scale: 1.05, y: -5 }}
          className="card bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 text-center group"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl text-white mb-4 group-hover:scale-110 transition-transform duration-300">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div className="text-4xl font-black gradient-text mb-2">{totalHydrogen}</div>
          <div className="text-gray-600 font-semibold">Total H₂ Production</div>
          <div className="text-sm text-gray-500 mt-1">tons produced</div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05, y: -5 }}
          className="card bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 text-center group"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl text-white mb-4 group-hover:scale-110 transition-transform duration-300">
            <Award className="w-8 h-8" />
          </div>
          <div className="text-4xl font-black text-blue-600 mb-2">{myCredits.length}</div>
          <div className="text-gray-600 font-semibold">Credits Issued</div>
          <div className="text-sm text-gray-500 mt-1">blockchain verified</div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05, y: -5 }}
          className="card bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 text-center group"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl text-white mb-4 group-hover:scale-110 transition-transform duration-300">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="text-4xl font-black text-purple-600 mb-2">{activeCredits}</div>
          <div className="text-gray-600 font-semibold">Active Credits</div>
          <div className="text-sm text-gray-500 mt-1">ready for trade</div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05, y: -5 }}
          className="card bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 text-center group"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl text-white mb-4 group-hover:scale-110 transition-transform duration-300">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full pulse-glow"></div>
            </div>
          </div>
          <div className="text-4xl font-black text-orange-600 mb-2">{verifiedCredits}</div>
          <div className="text-gray-600 font-semibold">Verified Credits</div>
          <div className="text-sm text-gray-500 mt-1">auditor approved</div>
        </motion.div>
      </motion.div>

      {/* Issue Credit Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <div className="card bg-gradient-to-br from-white to-green-50 border-green-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl text-white mb-4">
                <Plus className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Issue New Credit</h2>
              <p className="text-gray-600">Transform your green hydrogen production into verified blockchain credits</p>
            </div>

            <form onSubmit={handleIssueCredit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-800">
                  Hydrogen Production Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={hydrogenAmount}
                    onChange={(e) => setHydrogenAmount(e.target.value)}
                    className="input-field text-xl font-semibold pr-16"
                    placeholder="0.00"
                    required
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                    tons
                  </div>
                </div>
                <p className="text-sm text-gray-500">Enter the amount of green hydrogen produced for credit issuance</p>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full btn-primary text-xl py-6 flex items-center justify-center space-x-3 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Processing on Blockchain...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-6 h-6" />
                    <span>Issue Credit Now</span>
                  </>
                )}
              </motion.button>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Processing Time</div>
                  <div className="font-semibold text-gray-900">~2 seconds</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Blockchain Fee</div>
                  <div className="font-semibold text-green-600">Free</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Verification</div>
                  <div className="font-semibold text-blue-600">Instant</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Recent Credits */}
      {myCredits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="card bg-gradient-to-br from-white to-gray-50"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Your Credit Portfolio</h2>
              <p className="text-gray-600 mt-1">Track your recent green hydrogen credit issuances</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold gradient-text">{myCredits.length}</div>
              <div className="text-sm text-gray-500">Total Credits</div>
            </div>
          </div>

          <div className="space-y-4">
            {myCredits.slice(-5).reverse().map((credit, index) => (
              <motion.div
                key={credit.id}
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="group"
              >
                <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-200 shadow-sm group-hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      #{credit.id}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">Credit #{credit.id}</div>
                      <div className="text-gray-600 flex items-center space-x-2">
                        <span className="font-semibold">{credit.hydrogenAmount} tons H₂</span>
                        <span>•</span>
                        <span>{new Date(credit.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {credit.isVerified && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="status-verified"
                      >
                        ✓ Verified
                      </motion.span>
                    )}
                    {credit.isRetired ? (
                      <span className="status-retired">Retired</span>
                    ) : (
                      <span className="status-active">● Active</span>
                    )}
                    
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors">
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {myCredits.length > 5 && (
            <div className="text-center mt-6">
              <button className="btn-secondary">
                View All {myCredits.length} Credits
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Empty State */}
      {myCredits.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="card text-center py-16 bg-gradient-to-br from-gray-50 to-white"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <Factory className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Start?</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Issue your first green hydrogen credit and join the sustainable energy revolution
          </p>
          <button 
            onClick={() => document.querySelector('input')?.focus()}
            className="btn-primary"
          >
            Issue Your First Credit
          </button>
        </motion.div>
      )}
    </div>
  )
}