'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wifi, Thermometer, Zap, Droplets, Wind, AlertCircle, CheckCircle, Activity } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface IoTSensor {
  id: string
  name: string
  type: 'temperature' | 'pressure' | 'flow' | 'power' | 'purity'
  value: number
  unit: string
  status: 'online' | 'offline' | 'warning'
  lastUpdate: number
  location: string
}

interface ProductionData {
  timestamp: number
  hydrogenOutput: number
  energyInput: number
  efficiency: number
  purity: number
  temperature: number
  pressure: number
}

export default function IoTIntegrationPage() {
  const [sensors, setSensors] = useState<IoTSensor[]>([])
  const [productionData, setProductionData] = useLocalStorage<ProductionData[]>('productionData', [])
  const [isConnected, setIsConnected] = useState(true)
  const [realTimeData, setRealTimeData] = useState<ProductionData | null>(null)

  // Initialize mock IoT sensors
  useEffect(() => {
    const mockSensors: IoTSensor[] = [
      {
        id: 'TEMP_001',
        name: 'Electrolyzer Temperature',
        type: 'temperature',
        value: 65.4,
        unit: '°C',
        status: 'online',
        lastUpdate: Date.now(),
        location: 'Production Unit A'
      },
      {
        id: 'PRES_001',
        name: 'H₂ Pressure Monitor',
        type: 'pressure',
        value: 30.2,
        unit: 'bar',
        status: 'online',
        lastUpdate: Date.now(),
        location: 'Storage Tank 1'
      },
      {
        id: 'FLOW_001',
        name: 'Hydrogen Flow Rate',
        type: 'flow',
        value: 125.8,
        unit: 'kg/h',
        status: 'online',
        lastUpdate: Date.now(),
        location: 'Output Pipeline'
      },
      {
        id: 'PWR_001',
        name: 'Power Consumption',
        type: 'power',
        value: 4.2,
        unit: 'MW',
        status: 'warning',
        lastUpdate: Date.now(),
        location: 'Main Grid Connection'
      },
      {
        id: 'PUR_001',
        name: 'H₂ Purity Analyzer',
        type: 'purity',
        value: 99.97,
        unit: '%',
        status: 'online',
        lastUpdate: Date.now(),
        location: 'Quality Control Lab'
      }
    ]
    setSensors(mockSensors)
  }, [])

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update sensor values
      setSensors(prevSensors => 
        prevSensors.map(sensor => ({
          ...sensor,
          value: sensor.value + (Math.random() - 0.5) * (sensor.value * 0.05),
          lastUpdate: Date.now(),
          status: Math.random() > 0.95 ? 'warning' : 'online'
        }))
      )

      // Generate new production data point
      const newDataPoint: ProductionData = {
        timestamp: Date.now(),
        hydrogenOutput: 120 + Math.random() * 20,
        energyInput: 4.0 + Math.random() * 0.8,
        efficiency: 75 + Math.random() * 10,
        purity: 99.9 + Math.random() * 0.09,
        temperature: 60 + Math.random() * 15,
        pressure: 28 + Math.random() * 6
      }

      setRealTimeData(newDataPoint)
      setProductionData(prev => [...prev.slice(-100), newDataPoint])
    }, 3000)

    return () => clearInterval(interval)
  }, [setProductionData])

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'temperature': return <Thermometer className="w-5 h-5" />
      case 'pressure': return <Wind className="w-5 h-5" />
      case 'flow': return <Droplets className="w-5 h-5" />
      case 'power': return <Zap className="w-5 h-5" />
      case 'purity': return <Activity className="w-5 h-5" />
      default: return <Activity className="w-5 h-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'offline': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case 'offline': return <AlertCircle className="w-4 h-4 text-red-600" />
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const averageEfficiency = productionData.length > 0 ? 
    productionData.slice(-10).reduce((sum, data) => sum + data.efficiency, 0) / Math.min(10, productionData.length) : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 mb-12"
      >
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full px-6 py-3 border border-cyan-200">
          <Wifi className="w-6 h-6 text-cyan-600" />
          <span className="text-sm font-semibold text-cyan-800">Live Production Monitoring</span>
        </div>
        
        <h1 className="text-6xl font-black text-gray-900">
          IoT <span className="gradient-text">Dashboard</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Monitor your green hydrogen production facilities in real-time with 
          <span className="font-bold text-green-600"> intelligent sensors</span> and predictive analytics
        </p>
      </motion.div>

      {/* Connection Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card bg-gradient-to-r from-green-50 to-blue-50 border-green-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="font-semibold text-gray-900">
              {isConnected ? 'Connected to Production Facility' : 'Connection Lost'}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Last Update: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </motion.div>

      {/* Real-time Production Metrics */}
      {realTimeData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6"
        >
          <div className="card text-center bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <Droplets className="w-8 h-8 mx-auto mb-2 text-blue-200" />
            <div className="text-2xl font-bold">{realTimeData.hydrogenOutput.toFixed(1)}</div>
            <div className="text-blue-100">kg/h H₂ Output</div>
          </div>
          
          <div className="card text-center bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-200" />
            <div className="text-2xl font-bold">{realTimeData.energyInput.toFixed(1)}</div>
            <div className="text-yellow-100">MW Energy Input</div>
          </div>
          
          <div className="card text-center bg-gradient-to-br from-green-500 to-green-600 text-white">
            <Activity className="w-8 h-8 mx-auto mb-2 text-green-200" />
            <div className="text-2xl font-bold">{realTimeData.efficiency.toFixed(1)}%</div>
            <div className="text-green-100">Efficiency</div>
          </div>
          
          <div className="card text-center bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-purple-200" />
            <div className="text-2xl font-bold">{realTimeData.purity.toFixed(2)}%</div>
            <div className="text-purple-100">H₂ Purity</div>
          </div>
        </motion.div>
      )}

      {/* Sensor Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {sensors.map((sensor, index) => (
          <motion.div
            key={sensor.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={getStatusColor(sensor.status)}>
                  {getSensorIcon(sensor.type)}
                </div>
                <h3 className="font-semibold text-gray-900">{sensor.name}</h3>
              </div>
              {getStatusIcon(sensor.status)}
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">
                {sensor.value.toFixed(sensor.type === 'purity' ? 2 : 1)}
                <span className="text-lg text-gray-600 ml-1">{sensor.unit}</span>
              </div>
              
              <div className="text-sm text-gray-600">
                <div>ID: {sensor.id}</div>
                <div>Location: {sensor.location}</div>
                <div>Updated: {new Date(sensor.lastUpdate).toLocaleTimeString()}</div>
              </div>
            </div>
            
            {/* Mini trend indicator */}
            <div className="mt-4 h-8 flex items-end space-x-1">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gray-200 rounded-t"
                  style={{ 
                    height: `${20 + Math.random() * 80}%`,
                    backgroundColor: sensor.status === 'online' ? '#10b981' : '#f59e0b'
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Production Efficiency Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Production Efficiency Trend</h3>
          <div className="text-sm text-gray-600">
            Average: {averageEfficiency.toFixed(1)}%
          </div>
        </div>
        
        <div className="h-64 flex items-end space-x-1">
          {productionData.slice(-50).map((data, index) => (
            <div
              key={index}
              className="flex-1 bg-gradient-to-t from-green-600 to-green-400 rounded-t opacity-80 hover:opacity-100 transition-opacity"
              style={{ 
                height: `${(data.efficiency / 100) * 100}%`,
                minHeight: '4px'
              }}
              title={`${data.efficiency.toFixed(1)}% - ${new Date(data.timestamp).toLocaleTimeString()}`}
            />
          ))}
        </div>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          <span>AI-Powered Production Insights</span>
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-indigo-900">Optimization Recommendations</h4>
            <ul className="space-y-2 text-sm text-indigo-700">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Reduce electrolyzer temperature by 2°C to improve efficiency</span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span>Power consumption spike detected - check grid connection</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Hydrogen purity levels optimal for premium credit certification</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-indigo-900">Predictive Maintenance</h4>
            <ul className="space-y-2 text-sm text-indigo-700">
              <li className="flex items-start space-x-2">
                <Activity className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Electrolyzer maintenance recommended in 72 hours</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>All pressure sensors operating within normal parameters</span>
              </li>
              <li className="flex items-start space-x-2">
                <Activity className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Flow rate sensor calibration due next week</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}