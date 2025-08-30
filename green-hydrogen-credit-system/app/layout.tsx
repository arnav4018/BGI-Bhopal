import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'

export const metadata: Metadata = {
  title: 'Green Hydrogen Credit System | Sustainable Future',
  description: 'Revolutionary blockchain-based platform for transparent green hydrogen credit management with AI-powered fraud detection and IoT integration',
  keywords: 'green hydrogen, blockchain, sustainability, carbon credits, renewable energy',
  authors: [{ name: 'Green Hydrogen Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="overflow-x-hidden">
        {/* Background Elements */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50" />
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-20 left-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
            <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000" />
            <div className="absolute bottom-20 left-40 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000" />
          </div>
        </div>

        <div className="relative min-h-screen">
          <Navbar />
          <main className="container mx-auto px-6 py-12 max-w-7xl">
            <div className="relative z-10">
              {children}
            </div>
          </main>
          
          {/* Footer */}
          <footer className="relative z-10 mt-20 border-t border-white/20 bg-white/5 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-12 max-w-7xl">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold gradient-text">Green Hydrogen Credits</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Revolutionizing sustainable energy with blockchain technology and AI-powered transparency.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Platform</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>Producer Dashboard</li>
                    <li>Credit Marketplace</li>
                    <li>Analytics & Insights</li>
                    <li>IoT Integration</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Technology</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>Blockchain Security</li>
                    <li>AI Fraud Detection</li>
                    <li>Smart Contracts</li>
                    <li>Real-time Monitoring</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Impact</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>Carbon Footprint Tracking</li>
                    <li>Environmental Analytics</li>
                    <li>Sustainability Scoring</li>
                    <li>Global Compliance</li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-500 text-sm">
                  © 2024 Green Hydrogen Credit System. Built for a sustainable future.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}