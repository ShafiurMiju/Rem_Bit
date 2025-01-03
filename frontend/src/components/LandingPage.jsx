import { useState } from 'react';

import { 
  Layers, 
  Shield, 
  Globe, 
  Zap, 
  Code, 
  Lock, 
  ArrowRight,
  LogIn,
  UserPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState(null);

  const smartContractFeatures = [
    {
      icon: Layers,
      title: 'Smart Contract Technology',
      description: 'Transparent, automated transactions executed directly on blockchain',
      details: [
        'Peer-to-peer transfers without intermediaries',
        'Immutable transaction records',
        'Automatic execution of transfer conditions'
      ]
    },
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'Advanced cryptographic protection for every transaction',
      details: [
        '256-bit encryption',
        'Decentralized verification',
        'Tamper-proof transaction logs'
      ]
    },
    {
      icon: Globe,
      title: 'Global Instant Transfers',
      description: 'Seamless cross-border remittance powered by blockchain',
      details: [
        'Real-time transaction processing',
        'Supported in 150+ countries',
        'Minimal international transfer fees'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-[#E6E9EF] text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Code className="w-8 h-8 text-indigo-600" />
            <h1 className="text-xl font-bold tracking-tight text-gray-800">RemitChain</h1>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-2">
            <Link to='/registration' className="flex items-center space-x-1 bg-green-500/10 text-green-700 px-2.5 py-1 rounded-full hover:bg-green-500/20 transition text-xs">
              <UserPlus className="w-3.5 h-3.5 mr-1" />
              Register
            </Link>
            <Link to='/login' className="flex items-center space-x-1 bg-indigo-500/10 text-indigo-700 px-2.5 py-1 rounded-full hover:bg-indigo-500/20 transition text-xs">
              <LogIn className="w-3.5 h-3.5 mr-1" />
              Login
            </Link>
            <button className="bg-indigo-500/10 text-indigo-700 px-2.5 py-1 rounded-full hover:bg-indigo-500/20 transition text-xs">
              Wallet
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 max-w-md mx-auto w-full space-y-6 pt-20">
        {/* Hero Section */}
        <section className="relative text-center space-y-6 bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <Zap className="mx-auto w-12 h-12 text-indigo-600" />
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Blockchain-Powered Remittance
          </h2>
          <p className="text-gray-600 text-base">
            Secure, transparent, and instant cross-border transfers using smart contract technology
          </p>
        </section>

        {/* Smart Contract Feature Accordion */}
        <section className="space-y-4">
          {smartContractFeatures.map((feature, index) => (
            <div 
              key={feature.title}
              className={`
                rounded-2xl p-4 bg-white border transition-all duration-300
                ${activeSection === index 
                  ? 'shadow-lg border-indigo-500/30' 
                  : 'shadow-sm border-gray-200 hover:border-indigo-500/20'}
              `}
            >
              <div 
                onClick={() => setActiveSection(activeSection === index ? null : index)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <feature.icon className="w-10 h-10 text-indigo-600" />
                  <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                </div>
                <Lock className="w-6 h-6 text-gray-500" />
              </div>

              {activeSection === index && (
                <div className="mt-4 text-gray-600 space-y-3">
                  <p>{feature.description}</p>
                  <ul className="space-y-1 pl-4 list-disc text-sm">
                    {feature.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Action Buttons */}
        <section className="space-y-4 pt-4">
          <button className="w-full bg-indigo-600 text-white py-3.5 rounded-xl flex items-center justify-center space-x-2 hover:bg-indigo-700 transition shadow-md">
            <span>Start Secure Transfer</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button className="w-full border-2 border-indigo-600 text-indigo-700 py-3.5 rounded-xl hover:bg-indigo-50 transition">
            View Smart Contract Details
          </button>
        </section>

        {/* Technical Credibility Section */}
        <section className="text-center text-gray-500 text-sm space-y-2 my-8 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-center space-x-4">
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Smart Contract Verified</span>
            </div>
            <div className="flex items-center space-x-1">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>Blockchain Protected</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 py-4 text-center border-t border-gray-200">
        <p className="text-gray-500 text-xs">
          © 2024 RemitChain. Blockchain Remittance Solutions
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
