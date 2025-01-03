import { useState } from 'react';
import { 
  Send, 
  History, 
  Wallet, 
  Home,
  User,
  DollarSign,
  ArrowUpRight,
  Code
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock user and transaction data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    walletBalance: 5423.67,
    currency: 'USD',
    recentTransactions: [
      {
        id: 1,
        date: '2024-03-15',
        recipient: 'Maria Rodriguez',
        amount: 250.00,
        status: 'Completed',
        type: 'send'
      },
      {
        id: 2,
        date: '2024-03-10',
        recipient: 'Chen Wei',
        amount: 1500.00,
        status: 'Processing',
        type: 'receive'
      },
      {
        id: 3,
        date: '2024-03-05',
        recipient: 'Emma Thompson',
        amount: 750.50,
        status: 'Completed',
        type: 'send'
      }
    ]
  });

  return (
    <div className="h-screen bg-[#F5F7FA] flex flex-col">
      {/* Top Header */}
      <header className="bg-white p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-3">
          <Code className="w-6 h-6 text-indigo-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">RemitChain</h1>
            <p className="text-xs text-gray-500">Welcome, {userData.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-gray-100 p-2 rounded-full">
            <User className="w-5 h-5 text-gray-600" />
          </button>
          <button className="bg-gray-100 p-2 rounded-full">
            <DollarSign className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Wallet Card */}
        <div className="bg-indigo-600 rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-50">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="100" fill="white" fillOpacity="0.1"/>
            </svg>
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium">Total Balance</h3>
              <Wallet className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">
                {userData.walletBalance.toLocaleString()} {userData.currency}
              </h2>
              <button className="bg-white/20 p-2 rounded-full">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          <button className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <Send className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
            <span className="text-xs">Send</span>
          </button>
          <button className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <Wallet className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <span className="text-xs">Top Up</span>
          </button>
          <button className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <History className="w-6 h-6 mx-auto mb-2 text-orange-600" />
            <span className="text-xs">History</span>
          </button>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <button className="text-xs text-indigo-600">See All</button>
          </div>
          {userData.recentTransactions.map(transaction => (
            <div 
              key={transaction.id} 
              className="bg-white rounded-2xl p-4 flex items-center justify-between mb-3 shadow-sm"
            >
              <div className="flex items-center space-x-3">
                {transaction.type === 'send' ? (
                  <div className="bg-red-100 p-2 rounded-full">
                    <Send className="w-5 h-5 text-red-600" />
                  </div>
                ) : (
                  <div className="bg-green-100 p-2 rounded-full">
                    <Wallet className="w-5 h-5 text-green-600" />
                  </div>
                )}
                <div>
                  <h4 className="font-medium">{transaction.recipient}</h4>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${transaction.type === 'send' ? 'text-red-600' : 'text-green-600'}`}>
                  {transaction.type === 'send' ? '-' : '+'}
                  {transaction.amount.toLocaleString()} {userData.currency}
                </p>
                <span 
                  className={`
                    text-xs px-2 py-1 rounded-full 
                    ${transaction.status === 'Completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'}
                  `}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 p-2 flex justify-around items-center">
        <Link to='/dashboard' 
          className={`flex flex-col items-center ${activeTab === 'dashboard' ? 'text-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to='' 
          className={`flex flex-col items-center ${activeTab === 'wallet' ? 'text-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('wallet')}
        >
          <Wallet className="w-6 h-6" />
          <span className="text-xs mt-1">Wallet</span>
        </Link>
        <Link to='/newTransection' 
          className={`flex flex-col items-center ${activeTab === 'transactions' ? 'text-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('transactions')}
        >
          <History className="w-6 h-6" />
          <span className="text-xs mt-1">Transactions</span>
        </Link>
        <Link to='' 
          className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-indigo-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('profile')}
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default MobileDashboard;