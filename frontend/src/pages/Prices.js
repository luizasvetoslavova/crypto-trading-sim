import React, { useEffect, useState } from 'react';

function Prices() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
        )
            .then(res => res.json())
            .then(data => setCoins(data))
            .catch(err => console.error('Failed to fetch prices:', err));
    }, []);

    return (
        <div className="App">
            <h1>📊 Live Prices (Top 20 Cryptos)</h1>
            <table>
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Cryptocurrency</th>
                    <th>USD Price</th>
                </tr>
                </thead>
                <tbody>
                {coins.map(coin => (
                    <tr key={coin.id}>
                        <td>
                            <img
                                src={coin.image}
                                alt={`${coin.name} logo`}
                                width={28}
                                height={28}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
                                }}
                                style={{ verticalAlign: 'middle', borderRadius: '50%' }}
                            />
                        </td>
                        <td>{coin.symbol.toUpperCase()}</td>
                        <td>${coin.current_price.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Prices;
