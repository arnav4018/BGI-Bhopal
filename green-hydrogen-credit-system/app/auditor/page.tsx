'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Search, CheckCircle, AlertTriangle, Clock, ArrowRight } from 'lucide-react'
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

interface Transaction {
  creditId: number
  from: string
  to: string
  timestamp: number
  transactionType: 'ISSUED' | 'TRANSFERRED' | 'RETIRED' | 'VERIFIED'
}

export default function AuditorView() {
  const [credits, setCredits] = useLocalStorage<Credit[]>('credits', [])
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', [])
  const [searchCreditId, setSearchCreditId] = useState('')
  const [selectedCredit, setSelectedCredit] = useState<Credit | null>(null)
  const [creditHistory, setCreditHistory] = useState<Transaction[]>([])
  const [isVerifying, setIsVerifying] = useState(false)

  const auditorAddress = '0xABCD...EFGH' // Simulated auditor address

  const handleSearch = () => {
    const creditId = parseInt(searchCreditId)
    const credit = credits.find(c => c.id === creditId)
    
    if (credit) {
      setSelectedCredit(credit)
      // Get transaction history for this credit
      const history = transactions.filter(t => t.creditId === creditId)
      // Add the initial issuance transaction if not present
      if (!history.some(t => t.transactionType === 'ISSUED')) {
        history.unshift({
          creditId: credit.id,
          from: '',
          to: credit.producer,
          timestamp: credit.timestamp,
          transactionType: 'ISSUED'
        })
      }
      setCreditHistory(history.sort((a, b) => a.timestamp - b.timestamp))
    } else {
      setSelectedCredit(null)
      setCreditHistory([])
    }
  }

  const handleVerifyCredit = async (creditId: number) => {
    setIsVerifying(true)
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const updatedCredits = credits.map(credit => 
      credit.id === creditId 
        ? { ...credit, isVerified: true }
        : credit
    )
    
    const newTransaction: Transaction = {
      creditId,
      from: '',
      to: '',
      timestamp: Date.now(),
      transactionType: 'VERIFIED'
    }
    
    setCredits(updatedCredits)
    setTransactions([...transactions, newTransaction])
    
    // Update selected credit and history
    const updatedCredit = updatedCredits.find(c => c.id === creditId)
    if (updatedCredit) {
      setSelectedCredit(updatedCredit)
      setCreditHistory([...creditHistory, newTransaction])
    }
    
    setIsVerifying(false)
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'ISSUED':
        return <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
        </div>
      case 'TRANSFERRED':
        return <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <ArrowRight className="w-4 h-4 text-blue-600" />
        </div>
      case 'RETIRED':
        return <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
        </div>
      case 'VERIFIED':
        return <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-4 h-4 text-purple-600" />
        </div>
      default:
        return <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
    }
  }

  const getTransactionDescription = (transaction: Transaction) => {
    switch (transaction.transactionType) {
      case 'ISSUED':
        return `Credit issued to ${transaction.to}`
      case 'TRANSFERRED':
        return `Transferred from ${transaction.from} to ${transaction.to}`
      case 'RETIRED':
        return `Credit retired by ${transaction.from}`
      case 'VERIFIED':
        return 'Credit verified by auditor'
      default:
        return 'Unknown transaction'
    }
  }

  const unverifiedCredits = credits.filter(c => !c.isVerified && !c.isRetired)
  const verifiedCredits = credits.filter(c => c.isVerified)
  const suspiciousCredits = credits.filter(c => {
    // Simple fraud detection: credits with unusually high hydrogen amounts
    return c.hydrogenAmount > 1000 && !c.isVerified
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 mb-12"
      >
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-100 to-pink-100 rounded-full px-6 py-3 border border-red-200">
          <Shield className="w-6 h-6 text-red-600" />
          <span className="text-sm font-semibold text-red-800">Security & Verification</span>
        </div>
        
        <h1 className="text-6xl font-black text-gray-900">
          Auditor <span className="gradient-text">Control</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Ensure system integrity with 
          <span className="font-bold text-green-600"> AI-powered fraud detection</span> and comprehensive verification tools
        </p>
      </motion.div>

      {/* Stats Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-4 gap-6"
      >
        <div className="card text-center">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{verifiedCredits.length}</div>
          <div className="text-gray-600">Verified Credits</div>
        </div>
        <div className="card text-center">
          <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{unverifiedCredits.length}</div>
          <div className="text-gray-600">Pending Verification</div>
        </div>
        <div className="card text-center">
          <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{suspiciousCredits.length}</div>
          <div className="text-gray-600">Flagged for Review</div>
        </div>
        <div className="card text-center">
          <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{credits.length}</div>
          <div className="text-gray-600">Total Credits</div>
        </div>
      </motion.div>

      {/* Credit Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Verify Credit</h2>
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="number"
              placeholder="Enter Credit ID to verify..."
              value={searchCreditId}
              onChange={(e) => setSearchCreditId(e.target.value)}
              className="input-field pl-10"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            className="btn-primary"
          >
            Search
          </button>
        </div>
      </motion.div>

      {/* Credit Details */}
      <AnimatePresence>
        {selectedCredit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Credit #{selectedCredit.id} Details
              </h2>
              {!selectedCredit.isVerified && !selectedCredit.isRetired && (
                <button
                  onClick={() => handleVerifyCredit(selectedCredit.id)}
                  disabled={isVerifying}
                  className={`btn-primary flex items-center space-x-2 ${
                    isVerifying ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isVerifying ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Verify Credit</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Credit Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Credit Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hydrogen Amount:</span>
                    <span className="font-medium">{selectedCredit.hydrogenAmount} tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Producer:</span>
                    <span className="font-medium">{selectedCredit.producer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Owner:</span>
                    <span className="font-medium">{selectedCredit.currentOwner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <div className="flex space-x-2">
                      {selectedCredit.isVerified && <span className="status-verified">Verified</span>}
                      {selectedCredit.isRetired ? (
                        <span className="status-retired">Retired</span>
                      ) : (
                        <span className="status-active">Active</span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Issued:</span>
                    <span className="font-medium">{new Date(selectedCredit.timestamp).toLocaleString()}</span>
                  </div>
                </div>

                {/* Fraud Detection */}
                {selectedCredit.hydrogenAmount > 1000 && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Flagged for Review</span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">
                      This credit has an unusually high hydrogen amount and requires additional verification.
                    </p>
                  </div>
                )}
              </div>

              {/* Transaction History */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {creditHistory.map((transaction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      {getTransactionIcon(transaction.transactionType)}
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {transaction.transactionType}
                        </div>
                        <div className="text-sm text-gray-600">
                          {getTransactionDescription(transaction)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(transaction.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pending Verifications */}
      {unverifiedCredits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Pending Verifications</h2>
          <div className="space-y-4">
            {unverifiedCredits.slice(0, 5).map((credit) => (
              <div
                key={credit.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-semibold text-gray-900">Credit #{credit.id}</div>
                  <div className="text-sm text-gray-600">
                    {credit.hydrogenAmount} tons H₂ • Producer: {credit.producer}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSearchCreditId(credit.id.toString())
                    handleSearch()
                  }}
                  className="btn-primary text-sm"
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}