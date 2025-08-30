'use client'

import { motion } from 'framer-motion'
import { Leaf, Shield, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: "Green Hydrogen Credits",
      description: "Issue and manage credits for green hydrogen production with full transparency"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Immutable Ledger",
      description: "Blockchain-based system ensures all transactions are permanent and verifiable"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Multi-Role Access",
      description: "Separate interfaces for producers, consumers, and auditors"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: "Real-time Tracking",
      description: "Monitor credit status and transaction history in real-time"
    }
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <h1 className="text-5xl font-bold text-gray-900">
          Green Hydrogen 
          <span className="text-green-600"> Credit System</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A transparent, immutable, and user-friendly platform for managing green hydrogen credits 
          using blockchain technology. Ensuring trust and preventing double counting.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/producer" className="btn-primary text-lg px-8 py-3">
            Get Started
          </Link>
          <Link href="/ledger" className="btn-secondary text-lg px-8 py-3">
            View Credits
          </Link>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            className="card text-center space-y-4 hover:shadow-lg"
          >
            <div className="flex justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="card bg-gradient-to-r from-green-600 to-green-700 text-white"
      >
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold">100%</div>
            <div className="text-green-100">Transparent</div>
          </div>
          <div>
            <div className="text-3xl font-bold">0</div>
            <div className="text-green-100">Double Counting</div>
          </div>
          <div>
            <div className="text-3xl font-bold">∞</div>
            <div className="text-green-100">Immutable Records</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}