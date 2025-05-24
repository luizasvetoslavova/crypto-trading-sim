import React, { useState } from 'react';
import './App.css';
import CryptoList from './components/CryptoList';

function App() {
  const [balance, setBalance] = useState(10000);
  const [holdings, setHoldings] = useState({});
  const [crypto, setCrypto] = useState('BTC');
  const [amount, setAmount] = useState(0);

  const price = 50000;

  const handleBuy = () => {
    const cost = price * amount;
    if (amount <= 0) {
      alert("Amount must be positive.");
      return;
    }
    if (balance < cost) {
      alert("Insufficient balance.");
      return;
    }

    setBalance(prev => prev - cost);
    setHoldings(prev => ({
      ...prev,
      [crypto]: (prev[crypto] || 0) + amount
    }));
  };

  const handleSell = () => {
    if (amount <= 0) {
      alert("Amount must be positive.");
      return;
    }
    if ((holdings[crypto] || 0) < amount) {
      alert("Not enough crypto to sell.");
      return;
    }

    const revenue = price * amount;
    setBalance(prev => prev + revenue);
    setHoldings(prev => ({
      ...prev,
      [crypto]: prev[crypto] - amount
    }));
  };

  return (
      <div className="App">
        <h1>Crypto Trading</h1>
        <h2>💰 Virtual Balance: ${balance.toLocaleString()}</h2>

        <div style={{ margin: '20px 0' }}>
          <label>Crypto: </label>
          <select value={crypto} onChange={e => setCrypto(e.target.value)}>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            {/* Add more later */}
          </select>

          <label style={{ marginLeft: '20px' }}>Amount: </label>
          <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={e => setAmount(parseFloat(e.target.value))}
          />

          <button onClick={handleBuy} style={{ marginLeft: '20px' }}>Buy</button>
          <button onClick={handleSell} style={{ marginLeft: '10px' }}>Sell</button>
        </div>

        <div>
          <h3>📦 Holdings:</h3>
          <ul>
            {Object.entries(holdings).map(([key, val]) => (
                <li key={key}>{key}: {val.toFixed(4)}</li>
            ))}
          </ul>
        </div>

        <hr />

        <div>
          <h3>📊 Live Prices (Top 20 Cryptos)</h3>
          <CryptoList />
        </div>
      </div>
  );
}

export default App;