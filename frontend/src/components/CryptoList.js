import React from 'react';

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

const CryptoList = ({ prices }) => (
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
                    <td>{prices[symbol] ? `$${prices[symbol].toFixed(2)}` : 'Loading...'}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default CryptoList;
