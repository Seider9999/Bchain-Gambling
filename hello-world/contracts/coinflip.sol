//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
import "@api3/airnode-protocol/contracts/rrp/requesters/RrpRequesterV0.sol";

contract CoinFlipBchain is RrpRequesterV0 {
    event RequestedUint256(bytes32 indexed requestId);
    event ReceivedUint256(bytes32 indexed requestId, uint256 response);

    //set the owner of the contract (can use OZ library too)
    address public owner;
    // These can be set using setRequestParameters())
    address public airnode;
    bytes32 public endpointIdUint256;
    address public sponsorWallet;

    uint256 public randomNumberReturn;

    mapping(bytes32 => bool) public expectingRequestWithIdToBeFulfilled;

    constructor(address _airnodeRrp) RrpRequesterV0(_airnodeRrp) {
        owner = msg.sender;
    }

    // Set parameters used by airnodeRrp.makeFullRequest(...)
    // See makeRequestUint256()
    function setRequestParameters(
        address _airnode,
        bytes32 _endpointIdUint256,
        address _sponsorWallet
    ) external {
        // Must limit to owner or somebody can change parameters
        require(msg.sender == owner, "Sender not owner");
        airnode = _airnode;
        endpointIdUint256 = _endpointIdUint256;
        sponsorWallet = _sponsorWallet;
    }

    // Calls the AirnodeRrp contract with a request
    // airnodeRrp.makeFullRequest() returns a requestId to hold onto.
    function makeRequestUint256() public {
        bytes32 requestId = airnodeRrp.makeFullRequest(
            airnode,
            endpointIdUint256,
            address(this),
            sponsorWallet,
            address(this),
            this.fulfillUint256.selector,
            ""
        );
        // Store the requestId
        expectingRequestWithIdToBeFulfilled[requestId] = true;
        emit RequestedUint256(requestId);
    }

    // AirnodeRrp will call back with a response
    function fulfillUint256(bytes32 requestId, bytes calldata data)
        external
        onlyAirnodeRrp
    {
        // Verify the requestId exists
        require(
            expectingRequestWithIdToBeFulfilled[requestId],
            "Request ID not known"
        );
        expectingRequestWithIdToBeFulfilled[requestId] = false;
        uint256 qrngUint256 = abi.decode(data, (uint256));
        

        randomNumberReturn = qrngUint256 % 1000000;
        emit ReceivedUint256(requestId, qrngUint256);
    }

    function getRandom() public view returns (uint256) {
        return randomNumberReturn;
    }

    // Mapping user Funds
    mapping(address => uint256) public balances;

    // Add to msg.value
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    //Withdraw function
    function withdraw(uint256 _amount) public {
        //require arg to make sure the balance of the sender is >= _amount if not ERR
        require(balances[msg.sender] >= _amount, "Not enough ether");
        //if the amount is availabe we subtract it from the sender
        balances[msg.sender] -= _amount;
        //True bool is called to confirm the amount
        (bool sent, ) = msg.sender.call{value: _amount}("Sent");
        require(sent, "failed to send ETH");
    }

    //Contract Balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    //Sender Balance
    function getBalanceSender(address _user) public view returns (uint256) {
        return balances[_user];
    }

    // Bet Function for Betting on Number 1 (EVEN)
    function betOnEven(uint betAmount) public payable {

    uint256 randomNumber = getRandom();
    // if the random number is even
    if (randomNumber % 2 == 0) {
        // add the betAmount to the msg.sender
        makeRequestUint256();
        balances[msg.sender] += betAmount;
    } else {
        // if the number is odd, cut the betAmount from the msg.sender
        makeRequestUint256();
        balances[msg.sender] -= betAmount;
    }

    
}

// Bet Function for Betting on Number 2 (ODD)
    function betOnOdd(uint betAmount) public payable {

    uint256 randomNumber = getRandom();
    // if the random number is even, cut the betAmount from the msg.sender
    if (randomNumber % 2 == 0) {
        // t to the msg.sender
        makeRequestUint256();
        balances[msg.sender] -= betAmount;
    } else {
        // if the number is odd, add the betAmount to the msg.sender
        makeRequestUint256();
        balances[msg.sender] += betAmount;
    }
}





}
