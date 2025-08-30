'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ArrowRightLeft, Trash2, Eye, Filter, Search } from 'lucide-react'
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

export default function CreditLedger() {
  const [credits, setCredits] = useLocalStorage<Credit[]>('credits', [])
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', [])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedCredit, setSelectedCredit] = useState<Credit | null>(null)
  const [transferTo, setTransferTo] = useState('')
  const [isTransferring, setIsTransferring] = useState(false)

  const currentUser = '0x1234...5678' // Simulated current user

  const filteredCredits = credits.filter(credit => {
    const matchesSearch = credit.id.toString().includes(searchTerm) || 
                         credit.producer.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && !credit.isRetired) ||
                         (filterStatus === 'retired' && credit.isRetired) ||
                         (filterStatus === 'verified' && credit.isVerified)
    
    return matchesSearch && matchesFilter
  })

  const handleTransfer = async (creditId: number) => {
    if (!transferTo || transferTo === currentUser) return
    
    setIsTransferring(true)
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const updatedCredits = credits.map(credit => 
      credit.id === creditId 
        ? { ...credit, currentOwner: transferTo }
        : credit
    )
    
    const newTransaction: Transaction = {
      creditId,
      from: currentUser,
      to: transferTo,
      timestamp: Date.now(),
      transactionType: 'TRANSFERRED'
    }
    
    setCredits(updatedCredits)
    setTransactions([...transactions, newTransaction])
    setTransferTo('')
    setSelectedCredit(null)
    setIsTransferring(false)
  }

  const handleRetire = async (creditId: number) => {
    const updatedCredits = credits.map(credit => 
      credit.id === creditId 
        ? { ...credit, isRetired: true }
        : credit
    )
    
    const newTransaction: Transaction = {
      creditId,
      from: currentUser,
      to: '',
      timestamp: Date.now(),
      transactionType: 'RETIRED'
    }
    
    setCredits(updatedCredits)
    setTransactions([...transactions, newTransaction])
    setSelectedCredit(null)
  }

  const getStatusBadge = (credit: Credit) => {
    if (credit.isRetired) return <span className="status-retired">Retired</span>
    if (credit.isVerified) return <span className="status-verified">Verified</span>
    return <span className="status-active">Active</span>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 mb-12"
      >
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full px-6 py-3 border border-purple-200">
          <BookOpen className="w-6 h-6 text-purple-600" />
          <span className="text-sm font-semibold text-purple-800">Blockchain Ledger</span>
        </div>
        
        <h1 className="text-6xl font-black text-gray-900">
          Credit <span className="gradient-text">Ledger</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Explore the complete history of green hydrogen credits with 
          <span className="font-bold text-green-600"> immutable transparency</span> and real-time tracking
        </p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="card bg-gradient-to-br from-white to-gray-50 border-gray-200"
      >
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search credits by ID, producer, or owner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-14 text-lg"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-field min-w-[150px]"
              >
                <option value="all">All Credits</option>
                <option value="active">Active Only</option>
                <option value="retired">Retired Only</option>
                <option value="verified">Verified Only</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
              {filteredCredits.length} credits found
            </div>
          </div>
        </div>
      </motion.div>

      {/* Credits List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Credits ({filteredCredits.length})
        </h2>
        
        {filteredCredits.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No credits found matching your criteria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCredits.map((credit, index) => (
              <motion.div
                key={credit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-semibold text-gray-900">Credit #{credit.id}</div>
                      <div className="text-sm text-gray-600">
                        {credit.hydrogenAmount} tons H₂ • Producer: {credit.producer}
                      </div>
                      <div className="text-xs text-gray-500">
                        Owner: {credit.currentOwner} • {new Date(credit.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {getStatusBadge(credit)}
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedCredit(credit)}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    {credit.currentOwner === currentUser && !credit.isRetired && (
                      <>
                        <button
                          onClick={() => setSelectedCredit(credit)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Transfer Credit"
                        >
                          <ArrowRightLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRetire(credit.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Retire Credit"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Credit Detail Modal */}
      <AnimatePresence>
        {selectedCredit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCredit(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Credit #{selectedCredit.id} Details
              </h3>
              
              <div className="space-y-3 mb-6">
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
                  {getStatusBadge(selectedCredit)}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Issued:</span>
                  <span className="font-medium">{new Date(selectedCredit.timestamp).toLocaleString()}</span>
                </div>
              </div>

              {selectedCredit.currentOwner === currentUser && !selectedCredit.isRetired && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transfer to Address:
                    </label>
                    <input
                      type="text"
                      value={transferTo}
                      onChange={(e) => setTransferTo(e.target.value)}
                      className="input-field"
                      placeholder="0x..."
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleTransfer(selectedCredit.id)}
                      disabled={!transferTo || isTransferring}
                      className="btn-primary flex-1 disabled:opacity-50"
                    >
                      {isTransferring ? 'Transferring...' : 'Transfer'}
                    </button>
                    <button
                      onClick={() => setSelectedCredit(null)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              
              {(selectedCredit.currentOwner !== currentUser || selectedCredit.isRetired) && (
                <button
                  onClick={() => setSelectedCredit(null)}
                  className="btn-secondary w-full"
                >
                  Close
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}