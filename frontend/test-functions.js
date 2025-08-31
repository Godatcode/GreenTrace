// GreenTrace Function Test Script
// Run this in browser console to test functions

console.log('🌱 GreenTrace Function Test Starting...');

// Test 1: Check if contracts are loaded
function testContractLoading() {
    console.log('📋 Testing Contract Loading...');
    
    if (window.productRegistry) {
        console.log('✅ ProductRegistry contract loaded');
        console.log('Contract address:', window.productRegistry.address);
    } else {
        console.log('❌ ProductRegistry contract NOT loaded');
    }
    
    if (window.carbonCredit) {
        console.log('✅ CarbonCredit contract loaded');
        console.log('Contract address:', window.carbonCredit.address);
    } else {
        console.log('❌ CarbonCredit contract NOT loaded');
    }
}

// Test 2: Check blockchain connection
async function testBlockchainConnection() {
    console.log('🔗 Testing Blockchain Connection...');
    
    try {
        if (window.productRegistry) {
            const count = await window.productRegistry.getProductCount();
            console.log('✅ Blockchain connected, product count:', count.toString());
        } else {
            console.log('❌ ProductRegistry not available');
        }
    } catch (error) {
        console.log('❌ Blockchain connection failed:', error);
    }
}

// Test 3: Check Django backend
async function testDjangoBackend() {
    console.log('🐍 Testing Django Backend...');
    
    try {
        const response = await fetch('http://localhost:8000/api/health/');
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Django backend responding:', data);
        } else {
            console.log('❌ Django backend error:', response.status);
        }
    } catch (error) {
        console.log('❌ Django backend unreachable:', error);
    }
}

// Test 4: Check wallet connection
function testWalletConnection() {
    console.log('👛 Testing Wallet Connection...');
    
    if (window.ethereum && window.ethereum.selectedAddress) {
        console.log('✅ Wallet connected:', window.ethereum.selectedAddress);
        console.log('Network ID:', window.ethereum.networkVersion);
    } else {
        console.log('❌ Wallet not connected');
    }
}

// Run all tests
function runAllTests() {
    console.log('🚀 Running GreenTrace Function Tests...\n');
    
    testContractLoading();
    testBlockchainConnection();
    testDjangoBackend();
    testWalletConnection();
    
    console.log('\n✨ Test suite completed!');
}

// Export for use
window.greenTraceTests = {
    runAll: runAllTests,
    testContracts: testContractLoading,
    testBlockchain: testBlockchainConnection,
    testDjango: testDjangoBackend,
    testWallet: testWalletConnection
};

console.log('📚 Test functions loaded. Run: greenTraceTests.runAll()');
