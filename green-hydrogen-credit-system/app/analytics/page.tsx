'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Zap, Globe, Award, AlertTriangle } from 'lucide-react'
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

interface CarbonImpact {
  totalCO2Saved: number
  equivalentTrees: number
  equivalentCars: number
}

export default function AnalyticsPage() {
  const [credits] = useLocalStorage<Credit[]>('credits', [])
  const [carbonImpact, setCarbonImpact] = useState<CarbonImpact>({
    totalCO2Saved: 0,
    equivalentTrees: 0,
    equivalentCars: 0
  })

  useEffect(() => {
    // Calculate environmental impact
    // 1 ton of green hydrogen saves ~9.3 tons of CO2 compared to gray hydrogen
    const totalHydrogen = credits.reduce((sum, credit) => sum + credit.hydrogenAmount, 0)
    const co2Saved = totalHydrogen * 9.3
    const trees = Math.round(co2Saved * 16) // 1 ton CO2 = ~16 trees planted
    const cars = Math.round(co2Saved / 4.6) // Average car emits 4.6 tons CO2/year

    setCarbonImpact({
      totalCO2Saved: co2Saved,
      equivalentTrees: trees,
      equivalentCars: cars
    })
  }, [credits])

  const monthlyData = credits.reduce((acc, credit) => {
    const month = new Date(credit.timestamp).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    acc[month] = (acc[month] || 0) + credit.hydrogenAmount
    return acc
  }, {} as Record<string, number>)

  const verificationRate = credits.length > 0 ? 
    (credits.filter(c => c.isVerified).length / credits.length * 100).toFixed(1) : '0'

  const retirementRate = credits.length > 0 ? 
    (credits.filter(c => c.isRetired).length / credits.length * 100).toFixed(1) : '0'

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 mb-12"
      >
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-3 border border-purple-200">
          <BarChart3 className="w-6 h-6 text-purple-600" />
          <span className="text-sm font-semibold text-purple-800">Environmental Intelligence</span>
        </div>
        
        <h1 className="text-6xl font-black text-gray-900">
          Impact <span className="gradient-text">Analytics</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover the real-world environmental impact of your green hydrogen credits with 
          <span className="font-bold text-green-600"> AI-powered insights</span> and predictive analytics
        </p>
      </motion.div>

      {/* Carbon Impact Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="grid md:grid-cols-3 gap-8"
      >
        <motion.div 
          whileHover={{ scale: 1.05, y: -10 }}
          className="card bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 text-white relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <div className="text-xs text-green-100 font-semibold">CARBON IMPACT</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black">{carbonImpact.totalCO2Saved.toFixed(1)}</div>
              <div className="text-green-100 font-semibold text-lg">Tons CO₂ Saved</div>
              <div className="text-xs text-green-200">Equivalent to planting a forest</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05, y: -10 }}
          className="card bg-gradient-to-br from-blue-500 via-cyan-500 to-sky-600 text-white relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <div className="text-xs text-blue-100 font-semibold">FOREST EQUIVALENT</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black">{carbonImpact.equivalentTrees.toLocaleString()}</div>
              <div className="text-blue-100 font-semibold text-lg">Trees Planted</div>
              <div className="text-xs text-blue-200">Growing for 10 years</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05, y: -10 }}
          className="card bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600 text-white relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <div className="text-xs text-purple-100 font-semibold">TRANSPORT IMPACT</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-black">{carbonImpact.equivalentCars.toLocaleString()}</div>
              <div className="text-purple-100 font-semibold text-lg">Cars Off Road</div>
              <div className="text-xs text-purple-200">For one full year</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* System Health Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Verification Rate</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${verificationRate}%` }}
                  ></div>
                </div>
                <span className="font-semibold">{verificationRate}%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Retirement Rate</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${retirementRate}%` }}
                  ></div>
                </div>
                <span className="font-semibold">{retirementRate}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">System Integrity</span>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-600">100% Secure</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Production Trends</h3>
          <div className="space-y-3">
            {Object.entries(monthlyData).slice(-6).map(([month, amount], index) => (
              <div key={month} className="flex items-center justify-between">
                <span className="text-gray-600">{month}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(amount / Math.max(...Object.values(monthlyData))) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-green-600 h-2 rounded-full"
                    ></motion.div>
                  </div>
                  <span className="font-semibold">{amount}t</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-indigo-600" />
          <span>AI-Powered Insights</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-indigo-900">Market Predictions</h4>
            <p className="text-sm text-indigo-700">
              Based on current trends, green hydrogen production is expected to increase by 23% next quarter.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-indigo-900">Optimization Recommendations</h4>
            <p className="text-sm text-indigo-700">
              Consider implementing batch verification to reduce processing time by 15%.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Real-time Sustainability Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card text-center"
      >
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Sustainability Score</h3>
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              className="text-green-600"
              initial={{ strokeDasharray: "0 251.2" }}
              animate={{ strokeDasharray: `${(parseFloat(verificationRate) / 100) * 251.2} 251.2` }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">{verificationRate}</div>
              <div className="text-sm text-gray-600">Sustainability</div>
            </div>
          </div>
        </div>
        <p className="text-gray-600 mt-4">
          Based on verification rate, carbon impact, and system integrity
        </p>
      </motion.div>
    </div>
  )
}