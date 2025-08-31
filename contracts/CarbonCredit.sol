// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CarbonCredit {
    mapping(address => uint) public credits;
    event CreditIssued(address to, uint amount);
    event CreditRetired(address from, uint amount);

    function issueCredit(address _to, uint _amount) public {
        credits[_to] += _amount;
        emit CreditIssued(_to, _amount);
    }

    function retireCredit(uint _amount) public {
        require(credits[msg.sender] >= _amount, "Not enough credits");
        credits[msg.sender] -= _amount;
        emit CreditRetired(msg.sender, _amount);
    }
}
