import React, { useState, useEffect } from 'react';
import './App.css';
import CryptoList from './components/CryptoList';

function App() {
  const [balance, setBalance] = useState(10000);
  const [holdings, setHoldings] = useState({});
  const [crypto, setCrypto] = useState('BTC');
  const [amount, setAmount] = useState(0);
  const [prices, setPrices] = useState({});
  const [transactions, setTransactions] = useState([]);

  const topCryptos = {
    BTC: 'XBT/USD',
    ETH: 'ETH/USD',
    ADA: 'ADA/USD',
    DOT: 'DOT/USD',
    XRP: 'XRP/USD',
    LTC: 'LTC/USD',
    LINK: 'LINK/USD',
    BCH: 'BCH/USD',
    XLM: 'XLM/USD',
    TRX: 'TRX/USD',
    SOL: 'SOL/USD',
    DOGE: 'DOGE/USD',
    MATIC: 'MATIC/USD',
    AVAX: 'AVAX/USD',
    UNI: 'UNI/USD',
    AAVE: 'AAVE/USD',
    ATOM: 'ATOM/USD',
    ETC: 'ETC/USD',
    EOS: 'EOS/USD',
    XMR: 'XMR/USD'
  };

  useEffect(() => {
    const ws = new WebSocket('wss://ws.kraken.com');

    ws.onopen = () => {
      ws.send(JSON.stringify({
        event: "subscribe",
        pair: Object.values(topCryptos),
        subscription: {
          name: "ticker"
        }
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (Array.isArray(data) && data[1]?.c) {
        const pair = data[3];
        const price = parseFloat(data[1].c[0]).toFixed(2);
        const symbol = Object.keys(topCryptos).find(k => topCryptos[k] === pair);
        if (symbol) {
          setPrices(prev => ({ ...prev, [symbol]: parseFloat(price) }));
        }
      }
    };

    return () => ws.close();
  }, []);

  const currentPrice = prices[crypto];

  const handleBuy = () => {
    if (!currentPrice) {
      alert("Price not available yet.");
      return;
    }

    const cost = currentPrice * amount;
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

    setTransactions(prev => [
      ...prev,
      {
        type: 'BUY',
        crypto,
        amount,
        price: currentPrice,
        total: cost,
        timestamp: new Date().toLocaleString()
      }
    ]);
  };

  const handleSell = () => {
    if (!currentPrice) {
      alert("Price not available yet.");
      return;
    }

    if (amount <= 0) {
      alert("Amount must be positive.");
      return;
    }
    if ((holdings[crypto] || 0) < amount) {
      alert("Not enough crypto to sell.");
      return;
    }

    const revenue = currentPrice * amount;
    setBalance(prev => prev + revenue);
    setHoldings(prev => ({
      ...prev,
      [crypto]: prev[crypto] - amount
    }));

    setTransactions(prev => [
      ...prev,
      {
        type: 'SELL',
        crypto,
        amount,
        price: currentPrice,
        total: revenue,
        timestamp: new Date().toLocaleString()
      }
    ]);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your account? This will clear all holdings and transaction history.")) {
      setBalance(10000);
      setHoldings({});
      setTransactions([]);
    }
  };

  return (
      <div className="App">
        <h1>Crypto Trading</h1>
        <h2>💰 Virtual Balance: ${balance.toFixed(2)}</h2>

        <div style={{ margin: '20px 0' }}>
          <label>Crypto: </label>
          <select value={crypto} onChange={e => setCrypto(e.target.value)}>
            {Object.keys(topCryptos).map(c => (
                <option key={c} value={c}>{c}</option>
            ))}
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

          <div style={{ marginTop: '10px' }}>
            <button
                onClick={handleReset}
                style={{
                  background: 'darkred',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  marginTop: '10px'
                }}
            >
              🔄 Reset Account
            </button>
          </div>
        </div>

        <p>📈 Current Price of {crypto}: ${currentPrice ? currentPrice.toFixed(2) : 'Loading...'}</p>

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
          <CryptoList prices={prices} />
        </div>

        <hr />

        <div>
          <h3>📜 Transaction History</h3>
          {transactions.length === 0 ? (
              <p>No transactions yet.</p>
          ) : (
              <table border="1" cellPadding="5" style={{ margin: '0 auto', textAlign: 'center' }}>
                <thead>
                <tr>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Symbol</th>
                  <th>Amount</th>
                  <th>Price per unit (USD)</th>
                  <th>Total (USD)</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((tx, index) => (
                    <tr key={index}>
                      <td>{tx.timestamp}</td>
                      <td style={{ color: tx.type === 'BUY' ? 'green' : 'red' }}>{tx.type}</td>
                      <td>{tx.crypto}</td>
                      <td>{tx.amount.toFixed(4)}</td>
                      <td>${tx.price.toFixed(2)}</td>
                      <td>${tx.total.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
              </table>
          )}
        </div>
      </div>
  );
}

export default App;
