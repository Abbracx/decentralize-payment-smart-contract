// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FeesColector is Ownable {

    IERC20 public token;
    address public admin;
    uint256 EXPECTED_FEES= 10;

    event PaymentDone(
        address indexed student,
        uint amount,
        uint paymentId,
        uint date
    );

    struct Payment {
        uint paymentId;
        uint amount;
        uint date;
        string session;
    }

    struct Balance {
        uint totalPayment;
        uint numPayment;
        mapping( uint => Payment ) payments;
    }

    mapping( address => Balance ) public paymentsRecieved;

    constructor(address _token, address _admin) {
        token = IERC20(_token);
        admin = _admin;
    }

    //Show contracts Token in lock
    function getContractTokenBalance() public view returns(uint){
        return token.balanceOf(address(this));
    }

    //Holders can pay fees using UJTokens
    function pay(string memory session, uint256 _amount, uint _paymentId) public payable {
        require (msg.sender != address(0));
        require(_amount == EXPECTED_FEES, "Sorry, amount must be exact.");

        paymentsRecieved[msg.sender].totalPayment += _amount;
        Payment memory payment = Payment(_paymentId, _amount, block.timestamp, session);
        paymentsRecieved[msg.sender].payments[paymentsRecieved[msg.sender].numPayment] = payment;
        paymentsRecieved[msg.sender].numPayment++;

        token.transferFrom(msg.sender, address(this), _amount);
        emit PaymentDone(msg.sender, msg.value, _paymentId, block.timestamp);
    }

    
}

// Token address
//0x0019B62Da32E5b22b8dEE478aC7bB8f0bd24881a