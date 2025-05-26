<h1 align="center">💹 Crypto Trading Simulator</h1>

<p align="center">
  <img src="https://img.shields.io/badge/status-deployed-green" alt="Status">
  <img src="https://img.shields.io/badge/backend-Spring%20Boot-blue">
  <img src="https://img.shields.io/badge/frontend-React-orange">
  <img src="https://img.shields.io/badge/database-PostgreSQL-lightgrey">
</p>

<p align="center"><strong>A full-stack simulation platform for real-time cryptocurrency trading, built with Java, React, WebSockets, and SQL — designed for realistic trade execution, price monitoring, and transaction tracking.</strong></p>

<hr>

<h2>🚀 Overview</h2>

Crypto Trading Simulator is a web-based application that mimics the behavior of a real cryptocurrency trading interface. It enables users to monitor live prices of the top 20 cryptocurrencies, perform virtual trades (buy/sell), manage holdings, and review transaction history — all without connecting to a live exchange or using real funds.

The frontend is developed using React and communicates with a Spring Boot backend via REST APIs. Real-time price updates are delivered through Kraken’s WebSocket v2 Ticker API, ensuring accurate and responsive pricing.

<hr>

<h2>🎯 Core Features</h2>

<ul>
  <li><strong>Live Market Prices:</strong> Displays real-time quotes for the top 20 cryptocurrencies using the Kraken WebSocket API.</li>
  <li><strong>Virtual Trading System:</strong> Users start with a $10,000 virtual balance and can buy/sell cryptocurrencies at current market prices.</li>
  <li><strong>Holdings Dashboard:</strong> Shows owned cryptocurrencies and quantities with real-time value reflection based on live prices.</li>
  <li><strong>Transaction Ledger:</strong> Displays a detailed, timestamped history of all buy/sell operations.</li>
  <li><strong>Reset Mechanism:</strong> Resets the account balance and clears all holdings with one click.</li>
  <li><strong>Validation:</strong> Built-in checks to prevent trades with insufficient balance or non-existent assets.</li>
</ul>

<hr>

<h2>🛠️ Technology Stack</h2>

<h3>Frontend – React</h3>

<ul>
  <li>Built with <strong>React.js</strong> using functional components and hooks.</li>
  <li>Application-wide state is managed via <strong>React Context API</strong>.</li>
  <li>Live prices are received through <strong>WebSocket subscription</strong> to Kraken’s v2 Ticker feed.</li>
  <li><strong>Axios</strong> is used for all RESTful API requests to the backend.</li>
  <li>Interface is styled with clean, responsive CSS and designed for usability.</li>
</ul>

<h3>Backend – Spring Boot (Java 17)</h3>

<ul>
  <li>RESTful APIs built with <strong>Spring Boot</strong>.</li>
  <li>Database access via <strong>Spring JDBC</strong> using raw SQL (no ORM).</li>
  <li>Separation of concerns between controllers, repositories, and models.</li>
  <li>Endpoints handle balance, holdings, transactions, and reset functionality.</li>
</ul>

<h3>Database – PostgreSQL</h3>

<p>The relational database schema consists of three core tables:</p>

<pre>
<b>balance</b>
- amount DOUBLE

<b>holdings</b>
- cryptocurrency VARCHAR PRIMARY KEY
- amount DOUBLE

<b>transactions</b>
- is_buy BOOLEAN
- cryptocurrency VARCHAR
- units DOUBLE
- price_per_unit DOUBLE
- total DOUBLE
- timestamp TIMESTAMP
</pre>

<p>All tables are managed using SQL scripts without JPA or Hibernate.</p>

<hr>

<h2>📷 Screenshots</h2>

<h4>🏠 Trading Interface</h4>
<img src="https://github.com/luizasvetoslavova/crypto-trading-sim/blob/master/frontend/public/initial-screen.png" width="600"/>

<h4>📊 Live Prices</h4>
<img src="https://github.com/luizasvetoslavova/crypto-trading-sim/blob/master/frontend/public/prices-page.png" width="600"/>

<h4>📈 Portfolio After Transaction</h4>
<img src="https://github.com/luizasvetoslavova/crypto-trading-sim/blob/master/frontend/public/balance-after-transaction.png" width="600"/>

<h4>📜 Transaction History</h4>
<img src="https://github.com/luizasvetoslavova/crypto-trading-sim/blob/master/frontend/public/transaction-page.png" width="600"/>

<hr>

<h2>🎥 User Journey Demo</h2>

<a href="https://drive.google.com/file/d/1Dw6miv6r_fvIUxT0Ill8sVe8DB1CayVB/view?usp=sharing">
  <img src="https://github.com/luizasvetoslavova/crypto-trading-sim/blob/master/frontend/public/video-thumbnail.png" width="600" alt="Watch the demo video"/>
</a>
<p><em>Click the image to watch a full user journey demo.</em></p>

<hr>

<h2>📂 Project Structure</h2>

<pre>
crypto-trading-sim/
├── backend/
│   ├── controller/           # REST API logic and SQL repositories
│   ├── model/                # POJOs for Balance, Holding, Transaction
│   └── resources/            # application.properties
├── frontend/
│   ├── components/           # Reusable UI elements
│   ├── context/              # TradingContext (global state)
│   ├── pages/                # Route-level views: Home, Prices, History
│   └── public/               # Static files and screenshots
├── .env                      # Environment config for frontend API base URL
└── README.md
</pre>

<hr>

<h2>📦 Getting Started</h2>

<h3>For Developers</h3>

<h4>Backend (Spring Boot)</h4>
<ol>
  <li>Ensure PostgreSQL is installed and running.</li>
  <li>Configure the following environment variables or edit <code>application.properties</code>:
    <ul>
      <li><code>SPRING_DATASOURCE_URL</code></li>
      <li><code>SPRING_DATASOURCE_USERNAME</code></li>
      <li><code>SPRING_DATASOURCE_PASSWORD</code></li>
    </ul>
  </li>
  <li>Run the backend server:
    <pre>./gradlew bootRun</pre>
  </li>
</ol>

<h4>Frontend (React)</h4>
<ol>
  <li>Create a <code>.env</code> file in the <code>/frontend</code> directory with the API base URL:
    <pre>REACT_APP_API_BASE=http://localhost:8080</pre>
  </li>
  <li>Start the frontend server:
    <pre>
cd frontend
npm install
npm start
    </pre>
  </li>
</ol>

<hr>

<h3>For Users</h3>

<ol>
  <li>Visit the deployed application at:
    <br>
    <a href="https://crypto-trading-sim.netlify.app" target="_blank"><strong>🌐 crypto-trading-sim.netlify.app</strong></a>
  </li>
  <li>On the <strong>Home</strong> page:
    <ul>
      <li>Choose a cryptocurrency from the dropdown.</li>
      <li>Enter the amount to buy or sell.</li>
      <li>Click <strong>Buy</strong> or <strong>Sell</strong> to execute the virtual transaction.</li>
    </ul>
  </li>
  <li>To monitor live prices:
    <ul>
      <li>Navigate to the <strong>Live Prices</strong> page to view real-time updates.</li>
    </ul>
  </li>
  <li>To review past trades:
    <ul>
      <li>Visit the <strong>Transaction History</strong> page for a detailed ledger of all transactions.</li>
    </ul>
  </li>
  <li>To restart your trading session:
    <ul>
      <li>Click the <strong>Reset Account</strong> button to restore the original balance and clear holdings.</li>
    </ul>
  </li>
</ol>

<p><strong>Note:</strong> This platform is for simulation only. No actual funds are used or transferred.</p>

<h2>📌 Use Cases</h2>

<ul>
  <li><strong>Simulated Trading Practice:</strong> Users can experiment with buying and selling crypto without financial risk.</li>
  <li><strong>Educational Demonstration:</strong> Ideal for learning how real-time trading platforms work under the hood.</li>
  <li><strong>Strategy Testing:</strong> Allows testing different virtual investment strategies based on market behavior.</li>
  <li><strong>Demo for Financial Applications:</strong> Serves as a prototype or feature demo for larger fintech solutions.</li>
</ul>

<hr>

<h2>🧪 Testing</h2>

<ul>
  <li>Backend supports Spring Boot tests for endpoint and integration testing.</li>
  <li>Frontend prepared for unit tests with Jest (e.g., component rendering, logic validation).</li>
</ul>

<hr>

<h2>📋 License</h2>

This project is licensed for educational and non-commercial use.

---

<h3 align="center">Start simulating trades, monitoring live prices, and managing your virtual crypto portfolio — all from your browser.</h3>
