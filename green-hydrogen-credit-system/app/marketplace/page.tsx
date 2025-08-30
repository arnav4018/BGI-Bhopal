'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, TrendingUp, DollarSign, Users, Star, Filter, Search } from 'lucide-react'
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

interface MarketListing {
  creditId: number
  price: number
  seller: string
  listedAt: number
  description: string
  rating: number
}

interface PriceHistory {
  date: number
  price: number
}

export default function MarketplacePage() {
  const [credits] = useLocalStorage<Credit[]>('credits', [])
  const [listings, setListings] = useLocalStorage<MarketListing[]>('marketListings', [])
  const [priceHistory, setPriceHistory] = useLocalStorage<PriceHistory[]>('priceHistory', [])
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')
  const [selectedCredit, setSelectedCredit] = useState<Credit | null>(null)
  const [listingPrice, setListingPrice] = useState('')
  const [showListingModal, setShowListingModal] = useState(false)

  // Generate mock market data
  useEffect(() => {
    if (listings.length === 0 && credits.length > 0) {
      const mockListings: MarketListing[] = credits
        .filter(c => !c.isRetired && c.isVerified)
        .slice(0, 5)
        .map(credit => ({
          creditId: credit.id,
          price: Math.round((50 + Math.random() * 100) * 100) / 100,
          seller: credit.currentOwner,
          listedAt: Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
          description: `Premium green hydrogen credit from renewable energy source. ${credit.hydrogenAmount} tons certified.`,
          rating: 4.2 + Math.random() * 0.8
        }))
      setListings(mockListings)
    }

    // Generate price history
    if (priceHistory.length === 0) {
      const history: PriceHistory[] = []
      const basePrice = 75
      for (let i = 30; i >= 0; i--) {
        history.push({
          date: Date.now() - i * 24 * 60 * 60 * 1000,
          price: basePrice + Math.sin(i * 0.2) * 15 + Math.random() * 10
        })
      }
      setPriceHistory(history)
    }
  }, [credits, listings.length, priceHistory.length, setListings, setPriceHistory])

  const availableCredits = credits.filter(c => !c.isRetired && c.isVerified && !listings.some(l => l.creditId === c.id))
  const currentUser = '0x1234...5678'

  const filteredListings = listings.filter(listing => {
    const credit = credits.find(c => c.id === listing.creditId)
    if (!credit) return false

    const matchesSearch = credit.id.toString().includes(searchTerm) || 
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'low' && listing.price < 75) ||
                        (priceFilter === 'medium' && listing.price >= 75 && listing.price < 125) ||
                        (priceFilter === 'high' && listing.price >= 125)
    
    return matchesSearch && matchesPrice
  })

  const handleListCredit = () => {
    if (!selectedCredit || !listingPrice) return

    const newListing: MarketListing = {
      creditId: selectedCredit.id,
      price: parseFloat(listingPrice),
      seller: currentUser,
      listedAt: Date.now(),
      description: `Green hydrogen credit - ${selectedCredit.hydrogenAmount} tons certified`,
      rating: 4.5
    }

    setListings([...listings, newListing])
    setShowListingModal(false)
    setSelectedCredit(null)
    setListingPrice('')
  }

  const handlePurchase = (listing: MarketListing) => {
    // Simulate purchase
    setListings(listings.filter(l => l.creditId !== listing.creditId))
    
    // Update price history
    setPriceHistory([...priceHistory, { date: Date.now(), price: listing.price }])
  }

  const averagePrice = listings.length > 0 ? 
    listings.reduce((sum, l) => sum + l.price, 0) / listings.length : 0

  const priceChange = priceHistory.length > 1 ? 
    ((priceHistory[priceHistory.length - 1].price - priceHistory[priceHistory.length - 2].price) / priceHistory[priceHistory.length - 2].price * 100) : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 mb-12"
      >
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-100 to-red-100 rounded-full px-6 py-3 border border-orange-200">
          <ShoppingCart className="w-6 h-6 text-orange-600" />
          <span className="text-sm font-semibold text-orange-800">Global Trading Platform</span>
        </div>
        
        <h1 className="text-6xl font-black text-gray-900">
          Credit <span className="gradient-text">Marketplace</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Trade verified green hydrogen credits with 
          <span className="font-bold text-green-600"> AI-powered pricing</span> and transparent market dynamics
        </p>
      </motion.div>

      {/* Market Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-4 gap-6"
      >
        <div className="card text-center">
          <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">${averagePrice.toFixed(2)}</div>
          <div className="text-gray-600">Avg. Price/Credit</div>
        </div>
        <div className="card text-center">
          <TrendingUp className={`w-8 h-8 mx-auto mb-2 ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`} />
          <div className={`text-2xl font-bold ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(1)}%
          </div>
          <div className="text-gray-600">24h Change</div>
        </div>
        <div className="card text-center">
          <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{listings.length}</div>
          <div className="text-gray-600">Active Listings</div>
        </div>
        <div className="card text-center">
          <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">4.6</div>
          <div className="text-gray-600">Avg. Rating</div>
        </div>
      </motion.div>

      {/* Price Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Price History (30 Days)</h3>
        <div className="h-64 flex items-end space-x-1">
          {priceHistory.slice(-30).map((point, index) => (
            <div
              key={index}
              className="flex-1 bg-green-600 rounded-t opacity-70 hover:opacity-100 transition-opacity"
              style={{ 
                height: `${(point.price / Math.max(...priceHistory.map(p => p.price))) * 100}%`,
                minHeight: '4px'
              }}
              title={`$${point.price.toFixed(2)} - ${new Date(point.date).toLocaleDateString()}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search credits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">All Prices</option>
                <option value="low">Under $75</option>
                <option value="medium">$75 - $125</option>
                <option value="high">Over $125</option>
              </select>
            </div>
            <button
              onClick={() => setShowListingModal(true)}
              className="btn-primary"
            >
              List Credit
            </button>
          </div>
        </div>
      </motion.div>

      {/* Marketplace Listings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredListings.map((listing, index) => {
          const credit = credits.find(c => c.id === listing.creditId)
          if (!credit) return null

          return (
            <motion.div
              key={listing.creditId}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Credit #{credit.id}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{listing.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    <strong>Amount:</strong> {credit.hydrogenAmount} tons H₂
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Producer:</strong> {credit.producer}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Listed:</strong> {new Date(listing.listedAt).toLocaleDateString()}
                  </div>
                </div>

                <p className="text-sm text-gray-700">{listing.description}</p>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-2xl font-bold text-green-600">
                    ${listing.price}
                  </div>
                  <button
                    onClick={() => handlePurchase(listing)}
                    className="btn-primary"
                  >
                    Purchase
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No credits available matching your criteria</p>
        </div>
      )}

      {/* List Credit Modal */}
      <AnimatePresence>
        {showListingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowListingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">List Credit for Sale</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Credit
                  </label>
                  <select
                    value={selectedCredit?.id || ''}
                    onChange={(e) => {
                      const credit = availableCredits.find(c => c.id === parseInt(e.target.value))
                      setSelectedCredit(credit || null)
                    }}
                    className="input-field"
                  >
                    <option value="">Choose a credit...</option>
                    {availableCredits.map(credit => (
                      <option key={credit.id} value={credit.id}>
                        Credit #{credit.id} - {credit.hydrogenAmount} tons
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={listingPrice}
                    onChange={(e) => setListingPrice(e.target.value)}
                    className="input-field"
                    placeholder="Enter price"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleListCredit}
                    disabled={!selectedCredit || !listingPrice}
                    className="btn-primary flex-1 disabled:opacity-50"
                  >
                    List Credit
                  </button>
                  <button
                    onClick={() => setShowListingModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}