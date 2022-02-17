// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Buy is ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public token;
    address public admin;
    uint256 public nativeRate;
    uint256 public rateMultiplier = 100;

    mapping(address => uint256) public rates;

    constructor(address _admin, address _token, uint256 _nativeRate) {
        admin = _admin;
        token = IERC20(_token);
        nativeRate = _nativeRate;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    modifier notContract() {
        require(!_isContract(msg.sender), "Contract not allowed");
        require(msg.sender == tx.origin, "Proxy contract not allowed");
        _;
    }

    function deposit(address _depositToken, uint256 _amount) external nonReentrant notContract {
        require(_amount > 0, "Deposit amount is invalid");
        require(rates[_depositToken] > 0, "Token not supported");
        require(IERC20(_depositToken).balanceOf(msg.sender) >= _amount, "Not enough funds");
        
        uint256 tokensToReturn = _amount * rates[_depositToken] / rateMultiplier;
        require(token.balanceOf(admin) > tokensToReturn, "Not enough tokens in reserve");
        
        IERC20(_depositToken).transferFrom(msg.sender, address(this), _amount);
        token.transferFrom(admin, msg.sender, tokensToReturn);
    }

    function depositNative() payable external nonReentrant notContract {
        require(msg.value > 0, "Deposit amount is invalid");

        uint256 tokensToReturn = msg.value * nativeRate / rateMultiplier;
        require(token.balanceOf(admin) > tokensToReturn, "Not enough tokens in reserve");

        token.transferFrom(admin, msg.sender, tokensToReturn);
    }

    function setRate(address _token, uint256 _rate) external onlyAdmin {
        rates[_token] = _rate;
    }

    function setNativeRate(uint256 _rate) external onlyAdmin {
        nativeRate = _rate;
    }

    function recoverToken(address _token, uint256 _amount) external onlyAdmin {
        IERC20(_token).safeTransfer(address(msg.sender), _amount);
    }

    function _isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}