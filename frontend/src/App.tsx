import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  // Updated contract addresses after redeployment to Avalanche Fuji
  const contracts = {
    productRegistry: "0x78D866f9704FF874A3484C79aC9405947648588c",
    carbonCredit: "0x3b7Cbb8C26d2101dBC3808Cc597BCA879001160d"
  };

  return (
    <div className="App">
      <Dashboard contracts={contracts} />
    </div>
  );
}

export default App;
