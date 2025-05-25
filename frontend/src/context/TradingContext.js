import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

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
        axios.get("http://localhost:8081/balance").then(res => {
            setBalance(res.data.amount);
        });

        axios.get("http://localhost:8081/holdings").then(res => {
            const map = {};
            res.data.forEach(h => map[h.cryptocurrency] = h.amount);
            setHoldings(map);
        });

        axios.get("http://localhost:8081/transactions").then(res => {
            setTransactions(res.data.map(tx => ({
                ...tx,
                type: tx.buy ? 'BUY' : 'SELL',
                timestamp: new Date(tx.timestamp).toLocaleString()
            })));
        });
    }, []);

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

    const handleBuy = async (crypto, amount) => {
        const price = prices[crypto];
        const cost = price * amount;
        if (amount <= 0 || balance < cost) return;

        const newBalance = balance - cost;
        const newHoldings = { ...holdings, [crypto]: (holdings[crypto] || 0) + amount };
        const newTransaction = {
            buy: true,
            cryptocurrency: crypto,
            units: amount,
            pricePerUnit: price,
            total: cost,
            timestamp: new Date().toISOString()
        };

        setBalance(newBalance);
        setHoldings(newHoldings);
        setTransactions(prev => [newTransaction, ...prev]);

        await axios.post("http://localhost:8081/balance", { amount: newBalance });
        await axios.post("http://localhost:8081/holdings", { cryptocurrency: crypto, amount: newHoldings[crypto] });
        await axios.post("http://localhost:8081/transactions", newTransaction);
    };

    const handleSell = async (crypto, amount) => {
        const price = prices[crypto];
        const held = holdings[crypto] || 0;
        if (amount <= 0 || held < amount) return;

        const revenue = price * amount;
        const newBalance = balance + revenue;
        const newHoldings = { ...holdings, [crypto]: held - amount };
        const newTransaction = {
            buy: false,
            cryptocurrency: crypto,
            units: amount,
            pricePerUnit: price,
            total: revenue,
            timestamp: new Date().toISOString()
        };

        setBalance(newBalance);
        setHoldings(newHoldings);
        setTransactions(prev => [newTransaction, ...prev]);

        await axios.post("http://localhost:8081/balance", { amount: newBalance });
        await axios.post("http://localhost:8081/holdings", { cryptocurrency: crypto, amount: newHoldings[crypto] });
        await axios.post("http://localhost:8081/transactions", newTransaction);
    };

    const handleReset = async () => {
        try {
            await axios.post('http://localhost:8081/reset');
            setBalance(10000);
            setHoldings({});
        } catch (error) {
            console.error("Reset failed:", error);
        }
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
