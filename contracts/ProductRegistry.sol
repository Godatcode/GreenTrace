// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ProductRegistry {
    struct Product {
        string batchId;
        string product;
        string carbonActivity;
        string certification;
        uint timestamp;
        address producer;
        string privateData; // eERC privacy mock
        bool isCompliant;
        uint8 complianceScore; // 0-100
        string[] crossChainProofs; // Cross-chain verification proofs
        mapping(string => bool) crossChainVerified; // Track which chains have verified
    }

    // Cross-chain network addresses (mock)
    mapping(string => address) public crossChainNetworks;
    string[] public supportedNetworks;
    
    // Compliance rules
    mapping(string => bool) public validCertifications;
    mapping(string => uint8) public certificationScores;
    
    mapping(string => Product) public products;
    string[] public productBatchIds; // Track all product IDs
    
    event ProductAdded(string batchId, address producer, string certification, uint8 complianceScore);
    event CrossChainSync(string batchId, string network, string proof);
    event ComplianceUpdated(string batchId, bool isCompliant, uint8 score);

    constructor() {
        // Initialize supported cross-chain networks (mock addresses)
        crossChainNetworks["ethereum"] = 0x742d35Cc6634C0532925A3B8D4C9dB96C4B4d8B6;
        crossChainNetworks["polygon"] = 0x1234567890123456789012345678901234567890;
        crossChainNetworks["bsc"] = 0x0987654321098765432109876543210987654321;
        
        supportedNetworks = ["ethereum", "polygon", "bsc"];
        
        // Initialize valid certifications and their scores
        validCertifications["organic"] = true;
        validCertifications["fair-trade"] = true;
        validCertifications["carbon-neutral"] = true;
        validCertifications["sustainable"] = true;
        
        certificationScores["organic"] = 85;
        certificationScores["fair-trade"] = 80;
        certificationScores["carbon-neutral"] = 90;
        certificationScores["sustainable"] = 75;
    }

    function addProduct(
        string memory _batchId,
        string memory _product,
        string memory _carbonActivity,
        string memory _certification,
        string memory _privateData
    ) public {
        // Check if product already exists
        require(bytes(products[_batchId].batchId).length == 0, "Product with this batch ID already exists");
        
        // Create new product
        Product storage newProduct = products[_batchId];
        newProduct.batchId = _batchId;
        newProduct.product = _product;
        newProduct.carbonActivity = _carbonActivity;
        newProduct.certification = _certification;
        newProduct.timestamp = block.timestamp;
        newProduct.producer = msg.sender;
        newProduct.privateData = _privateData;
        
        // Calculate compliance score
        uint8 score = calculateComplianceScore(_certification, _carbonActivity);
        newProduct.complianceScore = score;
        newProduct.isCompliant = (score >= 70);
        
        // Add to the list of all products
        productBatchIds.push(_batchId);
        
        emit ProductAdded(_batchId, msg.sender, _certification, score);
        emit ComplianceUpdated(_batchId, newProduct.isCompliant, score);
    }

    // Calculate compliance score based on certification and carbon activity
    function calculateComplianceScore(string memory _certification, string memory _carbonActivity) 
        internal 
        view 
        returns (uint8) 
    {
        uint8 score = 0;
        
        // Base score from certification
        if (validCertifications[_certification]) {
            score += certificationScores[_certification];
        } else {
            score += 50; // Default score for unknown certification
        }
        
        // Bonus for carbon activity
        if (bytes(_carbonActivity).length > 0) {
            if (keccak256(abi.encodePacked(_carbonActivity)) == keccak256(abi.encodePacked("low-carbon"))) {
                score += 10;
            } else if (keccak256(abi.encodePacked(_carbonActivity)) == keccak256(abi.encodePacked("carbon-neutral"))) {
                score += 15;
            } else if (keccak256(abi.encodePacked(_carbonActivity)) == keccak256(abi.encodePacked("carbon-negative"))) {
                score += 20;
            }
        }
        
        // Cap score at 100
        return score > 100 ? 100 : score;
    }

    // Mock cross-chain sync (ICM simulation)
    function syncToOtherChain(string memory _batchId, string memory _network) 
        public 
        returns (string memory proof) 
    {
        require(bytes(products[_batchId].batchId).length > 0, "Product not found");
        require(crossChainNetworks[_network] != address(0), "Network not supported");
        
        // Generate mock cross-chain proof
        string memory timestamp = uint2str(block.timestamp);
        proof = string(abi.encodePacked(
            "0x",
            _batchId,
            "_",
            _network,
            "_",
            timestamp,
            "_",
            uint2str(uint256(uint160(crossChainNetworks[_network])))
        ));
        
        // Store proof and mark as verified
        products[_batchId].crossChainProofs.push(proof);
        products[_batchId].crossChainVerified[_network] = true;
        
        emit CrossChainSync(_batchId, _network, proof);
        return proof;
    }

    // Get cross-chain verification status
    function getCrossChainStatus(string memory _batchId) 
        public 
        view 
        returns (string[] memory networks, bool[] memory verified) 
    {
        require(bytes(products[_batchId].batchId).length > 0, "Product not found");
        
        networks = new string[](supportedNetworks.length);
        verified = new bool[](supportedNetworks.length);
        
        for (uint i = 0; i < supportedNetworks.length; i++) {
            networks[i] = supportedNetworks[i];
            verified[i] = products[_batchId].crossChainVerified[supportedNetworks[i]];
        }
    }

    // Get all cross-chain proofs for a product
    function getCrossChainProofs(string memory _batchId) 
        public 
        view 
        returns (string[] memory) 
    {
        require(bytes(products[_batchId].batchId).length > 0, "Product not found");
        return products[_batchId].crossChainProofs;
    }

    // Update compliance score (for regulators)
    function updateComplianceScore(string memory _batchId, uint8 _newScore) 
        public 
    {
        require(bytes(products[_batchId].batchId).length > 0, "Product not found");
        require(_newScore <= 100, "Score must be 0-100");
        
        products[_batchId].complianceScore = _newScore;
        products[_batchId].isCompliant = (_newScore >= 70);
        
        emit ComplianceUpdated(_batchId, products[_batchId].isCompliant, _newScore);
    }

    // Get enhanced product details including compliance
    function getProductWithCompliance(string memory _batchId)
        public
        view
        returns (
            string memory product,
            string memory carbonActivity,
            string memory certification,
            uint timestamp,
            address producer,
            bool isCompliant,
            uint8 complianceScore
        )
    {
        Product storage p = products[_batchId];
        require(bytes(p.batchId).length > 0, "Product not found");
        return (
            p.product, 
            p.carbonActivity, 
            p.certification, 
            p.timestamp, 
            p.producer,
            p.isCompliant,
            p.complianceScore
        );
    }

    // Get all supported networks
    function getSupportedNetworks() public view returns (string[] memory) {
        return supportedNetworks;
    }

    // Utility function to convert uint to string
    function uint2str(uint _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k -= 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    // Legacy functions for backward compatibility
    function viewPrivateData(string memory _batchId)
        public
        view
        returns (string memory)
    {
        return products[_batchId].privateData;
    }
    
    function getProduct(string memory _batchId)
        public
        view
        returns (
            string memory product,
            string memory carbonActivity,
            string memory certification,
            uint timestamp,
            address producer
        )
    {
        Product storage p = products[_batchId];
        require(bytes(p.batchId).length > 0, "Product not found");
        return (p.product, p.carbonActivity, p.certification, p.timestamp, p.producer);
    }
    
    function getProductCount() public view returns (uint) {
        return productBatchIds.length;
    }
    
    function getProductBatchIdByIndex(uint index) public view returns (string memory) {
        require(index < productBatchIds.length, "Index out of bounds");
        return productBatchIds[index];
    }
    
    function getAllProductBatchIds() public view returns (string[] memory) {
        return productBatchIds;
    }
}
