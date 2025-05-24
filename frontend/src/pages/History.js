import React from 'react';
import { useTrading } from '../context/TradingContext';

function History() {
    const { transactions } = useTrading();

    return (
        <div className="App">
            <h1>📜 Transaction History</h1>
            {transactions.length === 0 ? (
                <p>No transactions yet.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Time</th>
                        <th>Type</th>
                        <th>Symbol</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((tx, idx) => (
                        <tr key={idx}>
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
    );
}

export default History;
