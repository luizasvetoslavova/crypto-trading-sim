import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TradingProvider } from './context/TradingContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Prices from './pages/Prices';
import History from './pages/History';
import './App.css';

function App() {
    return (
        <TradingProvider>
            <Router>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/prices" element={<Prices />} />
                    <Route path="/history" element={<History />} />
                </Routes>
            </Router>
        </TradingProvider>
    );
}

export default App;
