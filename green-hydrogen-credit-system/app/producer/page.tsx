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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <Factory className="w-8 h-8 text-green-600" />
          <h1 className="text-4xl font-bold text-gray-900">Producer Dashboard</h1>
        </div>
        <p className="text-gray-600">Issue new Green Hydrogen Credits and manage your production</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-4 gap-6"
      >
        <div className="card text-center">
          <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{totalHydrogen}</div>
          <div className="text-gray-600">Total H₂ (tons)</div>
        </div>
        <div className="card text-center">
          <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{myCredits.length}</div>
          <div className="text-gray-600">Credits Issued</div>
        </div>
        <div className="card text-center">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <div className="w-4 h-4 bg-green-600 rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{activeCredits}</div>
          <div className="text-gray-600">Active Credits</div>
        </div>
        <div className="card text-center">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{verifiedCredits}</div>
          <div className="text-gray-600">Verified Credits</div>
        </div>
      </motion.div>

      {/* Issue Credit Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card max-w-md mx-auto"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Issue New Credit</h2>
        <form onSubmit={handleIssueCredit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hydrogen Amount (tons)
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={hydrogenAmount}
              onChange={(e) => setHydrogenAmount(e.target.value)}
              className="input-field"
              placeholder="Enter hydrogen amount"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full btn-primary flex items-center justify-center space-x-2 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Issuing Credit...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Issue Credit</span>
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Recent Credits */}
      {myCredits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Recent Credits</h2>
          <div className="space-y-4">
            {myCredits.slice(-5).reverse().map((credit) => (
              <motion.div
                key={credit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-semibold text-gray-900">Credit #{credit.id}</div>
                  <div className="text-sm text-gray-600">
                    {credit.hydrogenAmount} tons H₂ • {new Date(credit.timestamp).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {credit.isVerified && <span className="status-verified">Verified</span>}
                  {credit.isRetired ? (
                    <span className="status-retired">Retired</span>
                  ) : (
                    <span className="status-active">Active</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}