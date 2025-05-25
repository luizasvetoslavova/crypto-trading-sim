import React, { useEffect, useState } from 'react';
import axios from 'axios';

function History() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/transactions')
            .then(response => setTransactions(response.data))
            .catch(error => {
                console.error("Error fetching transactions:", error);
                setTransactions([]);
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
                        <th>Symbol</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((tx, idx) => {
                        const type = tx.is_buy === true ? 'BUY' : (tx.is_buy === false ? 'SELL' : 'N/A');
                        const symbol = tx.cryptocurrency || tx.crypto || 'N/A';
                        const amount = tx.units ?? tx.amount ?? 0;
                        const total = tx.total ?? 0;
                        const pricePerUnit = amount > 0 ? total / amount : null;

                        return (
                            <tr key={idx}>
                                <td>{new Date(tx.timestamp).toLocaleString()}</td>
                                <td style={{ color: type === 'BUY' ? 'green' : type === 'SELL' ? 'red' : 'gray' }}>
                                    {type}
                                </td>
                                <td>{symbol}</td>
                                <td>{amount ? amount.toFixed(4) : 'N/A'}</td>
                                <td>{pricePerUnit ? `$${pricePerUnit.toFixed(2)}` : 'N/A'}</td>
                                <td>{total ? `$${total.toFixed(2)}` : 'N/A'}</td>
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
