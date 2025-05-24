import React, { useEffect, useState } from 'react';

const CryptoList = () => {
    const [prices, setPrices] = useState({});

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
                    setPrices(prev => ({ ...prev, [symbol]: price }));
                }
            }
        };

        return () => ws.close();
    }, []);

    return (
        <div>
            <table border="1" cellPadding="5" style={{ margin: '0 auto', textAlign: 'center' }}>
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
                        <td>{prices[symbol] ? `$${prices[symbol]}` : 'Loading...'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoList;
