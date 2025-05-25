import React, { useState } from 'react';
import { useTrading } from '../context/TradingContext';

function Home() {
    const [crypto, setCrypto] = useState('BTC');
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null); // 'error' | 'success'

    const {
        balance, holdings, prices, topCryptos,
        handleBuy, handleSell, handleReset
    } = useTrading();

    const currentPrice = prices[crypto];

    const showMessage = (text, type = 'error') => {
        setMessage(text);
        setMessageType(type);
        setTimeout(() => {
            setMessage(null);
            setMessageType(null);
        }, 3000);
    };

    const handleBuyClick = () => {
        if (!currentPrice) {
            showMessage("Price not available yet.");
            return;
        }
        if (amount <= 0) {
            showMessage("Amount must be positive.");
            return;
        }
        const cost = currentPrice * amount;
        if (balance < cost) {
            showMessage("Insufficient balance.");
            return;
        }

        handleBuy(crypto, amount);
        showMessage(`Bought ${amount} ${crypto} for $${cost.toFixed(2)}.`, 'success');
    };

    const handleSellClick = () => {
        if (!currentPrice) {
            showMessage("Price not available yet.");
            return;
        }
        if (amount <= 0) {
            showMessage("Amount must be positive.");
            return;
        }
        if ((holdings[crypto] || 0) < amount) {
            showMessage("Not enough crypto to sell.");
            return;
        }

        const revenue = currentPrice * amount;
        handleSell(crypto, amount);
        showMessage(`Sold ${amount} ${crypto} for $${revenue.toFixed(2)}.`, 'success');
    };

    return (
        <div className="App">
            <h1>Crypto Trading</h1>
            <h2>💰 Virtual Balance: ${balance.toFixed(2)}</h2>

            <div style={{ margin: '20px 0' }}>
                <label>Crypto: </label>
                <select value={crypto} onChange={e => setCrypto(e.target.value)}>
                    {Object.keys(topCryptos).map(c => <option key={c} value={c}>{c}</option>)}
                </select>

                <label style={{ marginLeft: '20px' }}>Amount: </label>
                <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={e => setAmount(parseFloat(e.target.value))}
                />

                <button onClick={handleBuyClick} style={{ marginLeft: '20px' }}>Buy</button>
                <button onClick={handleSellClick} style={{ marginLeft: '10px' }}>Sell</button>

                <div style={{ marginTop: '10px' }}>
                    <button
                        onClick={() => window.confirm("Reset account?\n" +
                            "This will restore your balance and clear holdings.") && handleReset()}
                        className="reset"
                    >
                        🔄 Reset Account
                    </button>
                </div>
            </div>

            {message && (
                <div className={`message ${messageType}`}>
                    {message}
                </div>
            )}

            <p>📈 Current Price of {crypto}: ${currentPrice ? currentPrice.toFixed(2) : 'Loading...'}</p>

            <div>
                <h3>📦 Holdings:</h3>
                {Object.keys(holdings).length === 0 ? (
                    <p>N/A</p>
                ) : (
                    <ul>
                        {Object.entries(holdings).map(([key, val]) => (
                            <li key={key}>{key}: {val.toFixed(4)}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Home;
