import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
    <nav>
        <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>🏠 Home</NavLink>
            <NavLink to="/prices" className={({ isActive }) => isActive ? 'active' : ''}>📊 Live Prices</NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''}>📜 History</NavLink>
        </div>
    </nav>
);

export default Navigation;
