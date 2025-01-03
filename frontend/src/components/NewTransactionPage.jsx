import { useState } from 'react';
import { 
  Send, 
  Code,
  UserPlus, 
  Wallet, 
  ArrowRight,
  ChevronLeft,
  Home,
  History,
  User 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const NewTransactionPage = ({ userData = { name: 'User' } }) => {
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState('transactions');
  const [recipientDetails, setRecipientDetails] = useState({
    name: '',
    walletId: '',
    relationship: ''
  });
  const [transactionDetails, setTransactionDetails] = useState({
    amount: '',
    currency: 'USD',
    purpose: ''
  });

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];

  const handleRecipientDetailsChange = (e) => {
    const { name, value } = e.target;
    setRecipientDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTransactionDetailsChange = (e) => {
    const { name, value } = e.target;
    setTransactionDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderStepOne = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recipient Details</h2>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={recipientDetails.name}
            onChange={handleRecipientDetailsChange}
            placeholder="Enter recipient's full name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Wallet ID</label>
          <input
            type="text"
            name="walletId"
            value={recipientDetails.walletId}
            onChange={handleRecipientDetailsChange}
            placeholder="Enter recipient's wallet ID"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
          <select
            name="relationship"
            value={recipientDetails.relationship}
            onChange={handleRecipientDetailsChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Relationship</option>
            <option value="family">Family</option>
            <option value="friend">Friend</option>
            <option value="business">Business</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <button 
        onClick={() => setStep(2)}
        disabled={!recipientDetails.name || !recipientDetails.walletId}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:opacity-50"
      >
        Next <ArrowRight className="ml-2 w-5 h-5" />
      </button>
    </div>
  );

  const renderStepTwo = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Transaction Details</h2>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <div className="flex">
            <select
              name="currency"
              value={transactionDetails.currency}
              onChange={handleTransactionDetailsChange}
              className="rounded-l-lg border border-r-0 border-gray-300 px-3 py-2 bg-gray-100"
            >
              {currencies.map(curr => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>
            <input
              type="number"
              name="amount"
              value={transactionDetails.amount}
              onChange={handleTransactionDetailsChange}
              placeholder="Enter amount"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
          <select
            name="purpose"
            value={transactionDetails.purpose}
            onChange={handleTransactionDetailsChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Transaction Purpose</option>
            <option value="personal">Personal Transfer</option>
            <option value="business">Business Payment</option>
            <option value="education">Education</option>
            <option value="family_support">Family Support</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button 
          onClick={() => setStep(1)}
          className="w-1/3 bg-gray-200 text-gray-800 py-3 rounded-lg flex items-center justify-center"
        >
          <ChevronLeft className="mr-2 w-5 h-5" /> Back
        </button>
        
        <button 
          onClick={() => setStep(3)}
          disabled={!transactionDetails.amount || !transactionDetails.purpose}
          className="w-2/3 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:opacity-50"
        >
          Review Transaction <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderStepThree = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Transaction</h2>
      
      <div className="bg-white rounded-2xl p-4 space-y-3 shadow-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Recipient Name</span>
          <span className="font-medium">{recipientDetails.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Wallet ID</span>
          <span className="font-medium">{recipientDetails.walletId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Relationship</span>
          <span className="font-medium">{recipientDetails.relationship || 'Not Specified'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Amount</span>
          <span className="font-medium text-green-600">
            {transactionDetails.currency} {transactionDetails.amount}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Purpose</span>
          <span className="font-medium">{transactionDetails.purpose}</span>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button 
          onClick={() => setStep(2)}
          className="w-1/3 bg-gray-200 text-gray-800 py-3 rounded-lg flex items-center justify-center"
        >
          <ChevronLeft className="mr-2 w-5 h-5" /> Edit
        </button>
        
        <button 
          className="w-2/3 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
        >
          <Send className="mr-2 w-5 h-5" /> Confirm & Send
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-[#F5F7FA] flex flex-col">
      {/* Top Header */}
      <header className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <button className="mr-3">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <Code className="w-8 h-8 text-indigo-600" />
          <h1 className="text-xl font-bold tracking-tight text-gray-800">RemitChain</h1>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 font-medium">Welcome, {userData.name || 'User'}</span>
          <UserPlus className="w-5 h-5 text-gray-500" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">New Transaction</h2>

        {/* Progress Indicator */}
        <div className="flex justify-between items-center mb-4">
          <div 
            className={`w-1/3 h-1 ${step >= 1 ? 'bg-indigo-600' : 'bg-gray-300'} rounded-full`}
          />
          <div 
            className={`w-1/3 h-1 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'} rounded-full mx-2`}
          />
          <div 
            className={`w-1/3 h-1 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-300'} rounded-full`}
          />
        </div>

        {step === 1 && renderStepOne()}
        {step === 2 && renderStepTwo()}
        {step === 3 && renderStepThree()}
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

export default NewTransactionPage;
