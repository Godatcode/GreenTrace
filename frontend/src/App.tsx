import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  // Updated contract addresses after redeployment
  const contracts = {
    productRegistry: "0xFb49A248737a4AcE3D869a45F0c0fAf7c0B0d563",
    carbonCredit: "0x939D4970111D4d2E32Fd66E34d1Cbe6101383611"
  };

  return (
    <div className="App">
      <Dashboard contracts={contracts} />
    </div>
  );
}

export default App;
