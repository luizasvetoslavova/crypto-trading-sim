import React, { useEffect, useState } from 'react';
import axios from 'axios';

function History() {
    const [transactions, setTransactions] = useState([]);
    const API_BASE = process.env.REACT_APP_API_BASE;

    useEffect(() => {
        axios.get('http://localhost:8080/transactions')
            .then(res => {
                console.log("📦 Raw transaction data:", res.data);
                setTransactions(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch transactions:", err);
            });
    }, []);

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
                        <th>Cryptocurrency</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((tx, idx) => {
                        const rawIsBuy = tx.isBuy ?? tx.is_buy ?? tx.buy;
                        const isBuy = rawIsBuy === true || rawIsBuy === 'true' || rawIsBuy === 1;
                        const type = isBuy ? 'BUY' : 'SELL';

                        const symbol = tx.cryptocurrency ?? tx.crypto ?? 'N/A';
                        const amount = parseFloat(tx.units ?? tx.amount);
                        const price = parseFloat(tx.pricePerUnit ?? tx.price_per_unit);
                        //const total = parseFloat(tx.total);

                        return (
                            <tr key={idx}>
                                <td>{tx.timestamp ? new Date(tx.timestamp).toLocaleString() : 'N/A'}</td>
                                <td style={{ color: type === 'BUY' ? 'green' : 'red' }}>{type}</td>
                                <td>{symbol}</td>
                                <td>{!isNaN(amount) ? amount.toFixed(4) : 'N/A'}</td>
                                <td>{!isNaN(price) ? `$${price.toFixed(2)}` : 'N/A'}</td>
                                <td>
                                    {(tx.buy ? '- ' : '+ ')}${tx.total.toFixed(2)}
                                </td>

                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default History;