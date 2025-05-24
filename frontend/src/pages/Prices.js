import React from 'react';
import { useTrading } from '../context/TradingContext';

function Prices() {
    const { prices, topCryptos } = useTrading();

    return (
        <div className="App">
            <h1>📊 Live Prices (Top 20 Cryptos)</h1>
            <table>
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>USD Price</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(topCryptos).map(symbol => (
                    <tr key={symbol}>
                        <td>{symbol}</td>
                        <td>{prices[symbol] ? `$${prices[symbol].toFixed(2)}` : 'Loading...'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Prices;
