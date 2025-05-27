<h1 align="center">💹 Crypto Trading Simulator</h1>

<p align="center">
  <img src="https://img.shields.io/badge/status-deployed-green" alt="Status">
  <img src="https://img.shields.io/badge/frontend-React-orange">
  <img src="https://img.shields.io/badge/backend-Java%20%7C%20Spring%20Boot-blue">
  <img src="https://img.shields.io/badge/database-PostgreSQL-lightgrey">
</p>

<p align="center">
  <strong>A full-stack web application that simulates live cryptocurrency trading with real-time market prices, virtual account balances, and full trade history — built with React, Spring Boot, and PostgreSQL.</strong>
</p>

<hr>

<h2>🚀 Overview</h2>

Crypto Trading Simulator is a live cryptocurrency trading simulation platform. It allows users to buy and sell the top 20 cryptocurrencies using live market prices streamed from Kraken. The app tracks a virtual balance, updates holdings in real-time, and maintains a complete transaction ledger. It is ideal for users who want to experience crypto trading logic without using real funds.

- The **frontend** is built in React and deployed on **Netlify**.
- The **backend** runs Spring Boot, deployed on **Render**.
- All application data is stored in a cloud-hosted **NeonDB (PostgreSQL)** instance.
- Market prices are streamed using **Kraken WebSocket v2 Ticker API**.

<hr>

<h2>🎯 Key Features</h2>

<ul>
  <li><strong>Real-time Pricing:</strong> Live updates from Kraken for the top 20 cryptocurrencies.</li>
  <li><strong>Simulated Trades:</strong> Users can buy or sell at the current market rate using a virtual balance starting at $10,000.</li>
  <li><strong>Holdings Tracking:</strong> Updated portfolio overview after every trade.</li>
  <li><strong>Transaction History:</strong> Timestamped ledger showing type, price, units, and totals for each transaction.</li>
  <li><strong>Account Reset:</strong> Resets the balance and holdings to initial state with one click.</li>
  <li><strong>Error Handling:</strong> Prevents invalid trades (e.g., negative input, insufficient funds or assets).</li>
</ul>

<hr>

<h2>🛠️ Tech Stack</h2>

<h3>Frontend – React (Netlify)</h3>
<ul>
  <li>Built with <strong>React.js</strong> (SPA architecture).</li>
  <li><strong>React Context API</strong> for global state (balance, holdings, transactions).</li>
  <li><strong>Axios</strong> for REST communication with backend.</li>
  <li><strong>WebSocket</strong> connection to Kraken for live price updates.</li>
  <li>Hosted on <strong>Netlify</strong>.</li>
</ul>

<h3>Backend – Java & Spring Boot (Render)</h3>
<ul>
  <li>Java 17 with <strong>Spring Boot</strong> for REST API development.</li>
  <li>Data persistence using <strong>Spring JDBC</strong> (no JPA/ORM).</li>
  <li>Exposed endpoints for balance, holdings, transactions, and reset.</li>
  <li>Deployed on <strong>Render</strong> with environment variable support.</li>
</ul>

<h3>Database – PostgreSQL (NeonDB)</h3>
<ul>
  <li><strong>NeonDB</strong>: A cloud-native PostgreSQL instance.</li>
  <li>Schema includes:
    <ul>
      <li><code>balance(amount)</code></li>
      <li><code>holdings(cryptocurrency, amount)</code></li>
      <li><code>transactions(is_buy, cryptocurrency, units, price_per_unit, total, timestamp)</code></li>
    </ul>
  </li>
</ul>

<hr>

<h2>📷 Screenshots</h2>

<h4>🏠 Home / Trading Dashboard</h4>
<img src="https://github.com/luizasvetoslavova/crypto-trading-sim/blob/master/frontend/public/initial-screen.png" width="600"/>

<h4>📊 Live Prices Feed</h4>
<img src="https://github.com/luizasvetoslavova/crypto-trading-sim/blob/master/frontend/public/prices-page.png" width="600"/>

<h4>📈 Portfolio After Trade</h4>
<img src="https://github.com/luizasvetoslavova/crypto-trading-sim/blob/master/frontend/public/balance-after-transaction.png" width="600"/>

<h4>📜 Transaction History</h4>
<img src="https://github.com/luizasvetoslavova/crypto-trading-sim/blob/master/frontend/public/transaction-page.png" width="600"/>

<hr>

<h2>🎥 User Journey Demo</h2>

<a href="https://drive.google.com/file/d/1Dw6miv6r_fvIUxT0Ill8sVe8DB1CayVB/view?usp=sharing" target="_blank">
  <img src="https://github.com/luizasvetoslavova/crypto-trading-sim/blob/master/frontend/public/video-thumbnail.png" width="600" alt="Watch demo video"/>
</a>
<p><em>Click the image above to watch a complete walkthrough of the main features.</em></p>

<hr>

<h2>📂 Project Structure</h2>

<pre>
crypto-trading-sim/
├── backend/
│   ├── controller/        # REST API + SQL queries
│   ├── model/             # POJOs for Balance, Holding, Transaction
│   └── resources/         # application.properties
├── frontend/
│   ├── components/        # UI elements
│   ├── context/           # Global state management (TradingContext)
│   ├── pages/             # Home, Prices, History
│   └── public/            # Static assets & screenshots
└── README.md
</pre>

<hr>

<h2>📦 Getting Started</h2>
<ol>
  <li>Open the app:
    <br>
    <a href="https://crypto-trading-sim.netlify.app" target="_blank"><strong>🌐 crypto-trading-sim.netlify.app</strong></a>
  </li>
  <li>Use the trading dashboard to:
    <ul>
      <li>Select a cryptocurrency and trade using your virtual balance.</li>
      <li>Buy or sell based on live market prices.</li>
    </ul>
  </li>
  <li>Check:
    <ul>
      <li><strong>Live Prices</strong> tab for market updates.</li>
      <li><strong>Transaction History</strong> tab for trade records.</li>
      <li><strong>Reset</strong> button to restart your portfolio.</li>
    </ul>
  </li>
</ol>

<p><strong>Note:</strong> This is a simulation tool. No real cryptocurrency is bought, sold, or transferred.</p>

<hr>

<h2>📌 Use Cases</h2>

<ul>
  <li><strong>Practice Environment:</strong> Safely explore crypto trading with zero financial risk.</li>
  <li><strong>Learning Tool:</strong> Understand how live prices, balances, and order logic work in a real-world trading platform.</li>
</ul>

<hr>

<h2>🧪 Testing</h2>

<ul>
  <li>Backend supports Spring Boot tests (unit + integration).</li>
  <li>Frontend includes setup for Jest-based unit tests.</li>
</ul>

<hr>

<h3 align="center">Start simulating trades, monitoring markets, and managing your virtual portfolio — all in real time.</h3>
