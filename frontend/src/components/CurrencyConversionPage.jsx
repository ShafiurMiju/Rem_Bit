import { useState } from 'react';

const CurrencyConversionPage = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleConversion = () => {
    const exchangeRate = 0.85; // Example exchange rate
    setConvertedAmount(amount * exchangeRate);
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Currency Conversion</h1>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">From Currency</label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">To Currency</label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
      <button
        onClick={handleConversion}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Convert
      </button>
      {convertedAmount !== null && (
        <p className="mt-4 text-lg font-medium">
          Converted Amount: {convertedAmount.toFixed(2)} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyConversionPage;
