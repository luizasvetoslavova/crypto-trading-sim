import React, { createContext, useContext, useEffect, useState } from 'react';

const TradingContext = createContext();

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
    DOGE: 'XDG/USD',
    MATIC: 'POL/USD',
    AVAX: 'AVAX/USD',
    UNI: 'UNI/USD',
    AAVE: 'AAVE/USD',
    ATOM: 'ATOM/USD',
    ETC: 'ETC/USD',
    EOS: 'EOS/USD',
    XMR: 'XMR/USD'
};

export const TradingProvider = ({ children }) => {
    const [balance, setBalance] = useState(10000);
    const [holdings, setHoldings] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [prices, setPrices] = useState({});

    useEffect(() => {
        const ws = new WebSocket('wss://ws.kraken.com');
        ws.onopen = () => {
            ws.send(JSON.stringify({
                event: "subscribe",
                pair: Object.values(topCryptos),
                subscription: { name: "ticker" }
            }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (Array.isArray(data) && data[1]?.c) {
                const pair = data[3];
                const price = parseFloat(data[1].c[0]);
                const symbol = Object.keys(topCryptos).find(k => topCryptos[k] === pair);
                if (symbol) {
                    setPrices(prev => ({ ...prev, [symbol]: price }));
                }
            }
        };

        return () => ws.close();
    }, []);

    const handleBuy = (crypto, amount) => {
        const price = prices[crypto];
        const cost = price * amount;
        if (amount <= 0 || balance < cost) return;
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
                price,
                total: cost,
                timestamp: new Date().toLocaleString()
            }
        ]);
    };

    const handleSell = (crypto, amount) => {
        const price = prices[crypto];
        if (amount <= 0 || (holdings[crypto] || 0) < amount) return;
        const revenue = price * amount;
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
                price,
                total: revenue,
                timestamp: new Date().toLocaleString()
            }
        ]);
    };

    const handleReset = () => {
        setBalance(10000);
        setHoldings({});
        setTransactions([]);
    };

    return (
        <TradingContext.Provider value={{
            balance,
            holdings,
            transactions,
            prices,
            topCryptos,
            handleBuy,
            handleSell,
            handleReset
        }}>
            {children}
        </TradingContext.Provider>
    );
};

export const useTrading = () => useContext(TradingContext);
