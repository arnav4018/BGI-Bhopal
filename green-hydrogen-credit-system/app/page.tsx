'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Leaf, Shield, Users, TrendingUp, Sparkles, Zap, Globe, Award, ArrowRight, Play, Star, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'

export default function Home() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const statsRef = useRef(null)
  
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  
  const isHeroInView = useInView(heroRef, { once: true })
  const isFeaturesInView = useInView(featuresRef, { once: true })
  const isStatsInView = useInView(statsRef, { once: true })

  const features = [
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Smart Credit Management",
      description: "AI-powered credit issuance with real-time environmental impact tracking and carbon footprint analysis",
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
      delay: 0.1
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Advanced Fraud Prevention",
      description: "Machine learning algorithms detect suspicious patterns and prevent double counting with 99.9% accuracy",
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50",
      delay: 0.2
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Dynamic Marketplace",
      description: "Intelligent trading platform with real-time pricing, automated matching, and predictive analytics",
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-50 to-pink-50",
      delay: 0.3
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "IoT Integration",
      description: "Live monitoring of production facilities with sensor data, predictive maintenance, and quality assurance",
      color: "from-orange-500 to-red-600",
      bgColor: "from-orange-50 to-red-50",
      delay: 0.4
    }
  ]

  const stats = [
    { value: "100%", label: "Transparency", icon: <CheckCircle className="w-6 h-6" /> },
    { value: "0", label: "Double Counting", icon: <Shield className="w-6 h-6" /> },
    { value: "AI", label: "Fraud Detection", icon: <Zap className="w-6 h-6" /> },
    { value: "IoT", label: "Real-time Data", icon: <Globe className="w-6 h-6" /> },
  ]

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Sustainability Officer",
      company: "GreenTech Industries",
      content: "This platform has revolutionized how we track and trade our green hydrogen credits. The AI fraud detection gives us complete confidence.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Renewable Energy Director",
      company: "EcoFuel Corp",
      content: "The IoT integration is game-changing. We can monitor our production in real-time and automatically generate verified credits.",
      rating: 5
    }
  ]

  return (
    <div className="space-y-32 pt-20">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center"
      >
        <div className="absolute inset-0 hero-gradient opacity-50" />
        
        <div className="relative z-10 text-center space-y-8 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-semibold text-gray-700">Revolutionary Blockchain Technology</span>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-black leading-tight">
              <span className="block gradient-text">Green Hydrogen</span>
              <span className="block text-gray-900">Credit System</span>
            </h1>
            
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              The world's first AI-powered, IoT-integrated blockchain platform for 
              <span className="gradient-text font-bold"> transparent and fraud-proof </span>
              green hydrogen credit management
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/producer" className="btn-primary text-xl px-10 py-5 group">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button 
              onClick={() => setIsVideoPlaying(true)}
              className="btn-secondary text-xl px-10 py-5 group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 mb-4">
                  <div className="text-green-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-400/20 rounded-full blur-xl floating-animation" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl floating-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-purple-400/20 rounded-full blur-xl floating-animation" style={{ animationDelay: '4s' }} />
      </motion.section>

      {/* Features Section */}
      <motion.section 
        ref={featuresRef}
        className="space-y-16"
      >
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-6 py-3 border border-green-200"
          >
            <Award className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-800">Award-Winning Features</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold text-gray-900"
          >
            Powered by <span className="gradient-text">Next-Gen Technology</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Experience the future of sustainable energy trading with our revolutionary platform
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: feature.delay }}
              className="group"
            >
              <div className={`card bg-gradient-to-br ${feature.bgColor} border-0 group-hover:scale-105 transition-all duration-500`}>
                <div className="space-y-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl text-white shadow-lg`}>
                    {feature.icon}
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                  
                  <div className="flex items-center text-sm font-semibold text-gray-500 group-hover:text-gray-700 transition-colors">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section className="space-y-16">
        <div className="text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-gray-900"
          >
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="card bg-gradient-to-br from-white to-gray-50"
            >
              <div className="space-y-6">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-lg text-gray-700 leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        ref={statsRef}
        className="relative"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="card bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white text-center space-y-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-5xl font-bold">Ready to Transform Your Business?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join the sustainable energy revolution with our cutting-edge blockchain platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/producer" className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105">
                Start Free Trial
              </Link>
              <Link href="/marketplace" className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105">
                Explore Platform
              </Link>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        </motion.div>
      </motion.section>
    </div>
  )
}