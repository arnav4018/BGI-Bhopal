'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Leaf, Factory, BookOpen, Shield, ShoppingCart, BarChart3, Wifi, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const navOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95])
  
  const navItems = [
    { href: '/', label: 'Home', icon: <Leaf className="w-4 h-4" />, color: 'text-green-600' },
    { href: '/producer', label: 'Producer', icon: <Factory className="w-4 h-4" />, color: 'text-blue-600' },
    { href: '/ledger', label: 'Ledger', icon: <BookOpen className="w-4 h-4" />, color: 'text-purple-600' },
    { href: '/marketplace', label: 'Market', icon: <ShoppingCart className="w-4 h-4" />, color: 'text-orange-600' },
    { href: '/analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" />, color: 'text-pink-600' },
    { href: '/iot-integration', label: 'IoT', icon: <Wifi className="w-4 h-4" />, color: 'text-cyan-600' },
    { href: '/auditor', label: 'Auditor', icon: <Shield className="w-4 h-4" />, color: 'text-red-600' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'navbar-blur shadow-2xl' : 'bg-transparent'
      }`}
      style={{ opacity: navOpacity }}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-white" />
                </div>
              </div>
              <div className="hidden md:block">
                <span className="text-2xl font-bold gradient-text">GH Credits</span>
                <div className="text-xs text-gray-500 font-medium">Sustainable Future</div>
              </div>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`relative flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50 backdrop-blur-sm'
                    }`}
                  >
                    <div className={`transition-all duration-300 ${isActive ? 'text-white' : item.color} group-hover:scale-110`}>
                      {item.icon}
                    </div>
                    <span className="font-semibold text-sm hidden lg:block">{item.label}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl -z-10"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Hover glow effect */}
                    {!isActive && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Status Indicator */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="hidden md:flex items-center space-x-3"
          >
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">Live</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}