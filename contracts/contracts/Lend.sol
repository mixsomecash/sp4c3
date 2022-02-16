// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Lend is ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public token;
    address public admin;
    uint256 public nativeRate;
    uint256 public premium; // 100 = 1%

    mapping(address => uint256) public rates;
    mapping(address => uint256) public nativeBalances;
    mapping(address => mapping(address => uint256)) public balances;

    uint256 public RATE_MULTIPLIER = 100;

    constructor(address _admin, address _token, uint256 _nativeRate, uint256 _premium) {
        admin = _admin;
        token = IERC20(_token);
        nativeRate = _nativeRate;
        premium = _premium;
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

        uint256 amountWithPremium = (_amount * (10000 + premium)) / 10000;
        require(IERC20(_depositToken).balanceOf(msg.sender) >= amountWithPremium, "Not enough funds");
        
        uint256 tokensToReturn = _amount * rates[_depositToken] / RATE_MULTIPLIER;
        require(token.balanceOf(admin) > tokensToReturn, "Not enough tokens in reserve");
        
        IERC20(_depositToken).transferFrom(msg.sender, address(this), amountWithPremium);
        token.transferFrom(admin, msg.sender, tokensToReturn);

        balances[msg.sender][_depositToken] += _amount;
    }

    function depositNative() payable external nonReentrant notContract {
        require(msg.value > 0, "Deposit amount is invalid");

        uint256 amountWithoutPremium = (msg.value / (10000 + premium)) * 10000;
        uint256 tokensToReturn = amountWithoutPremium * nativeRate / RATE_MULTIPLIER;
        require(token.balanceOf(admin) > tokensToReturn, "Not enough tokens in reserve");

        token.transferFrom(admin, msg.sender, tokensToReturn);

        nativeBalances[msg.sender] += amountWithoutPremium;
    }

    function withdraw(address _depositToken, uint256 _amount) external nonReentrant notContract {
        require(rates[_depositToken] > 0, "Token not supported");
        require(balances[msg.sender][_depositToken] >= _amount, "Not enough tokens deposited");

        uint256 tokensToGet = _amount * rates[_depositToken] / RATE_MULTIPLIER;
        require(token.balanceOf(msg.sender) > tokensToGet, "Not enough tokens");

        token.transferFrom(msg.sender, admin, tokensToGet);
        IERC20(_depositToken).transferFrom(address(this), msg.sender, _amount);

        balances[msg.sender][_depositToken] -= _amount;
    }

    function withdrawNative(uint256 _amount) external nonReentrant notContract {
        require(nativeBalances[msg.sender] >= _amount, "Not enough tokens deposited");

        uint256 tokensToGet = _amount * nativeRate / RATE_MULTIPLIER;
        require(token.balanceOf(msg.sender) > tokensToGet, "Not enough tokens");

        token.transferFrom(msg.sender, admin, tokensToGet);
        payable(msg.sender).transfer(_amount);

        nativeBalances[msg.sender] -= _amount;
    }

    function setRate(address _token, uint256 _rate) external onlyAdmin {
        rates[_token] = _rate;
    }

    function setPremium(uint256 _premium) external onlyAdmin {
        premium = _premium;
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