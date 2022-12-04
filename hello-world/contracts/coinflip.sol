pragma solidity >=0.7.3;

contract CoinFlip {
    // Address of the contract owner
    address payable public owner;

    // Current balance of the contract (in wei)
    uint256 public balance;

    // Flag to indicate whether the contract can be updated
    bool public isUpdateable;

    // Constructor function, called when the contract is deployed
    constructor() public {
        // Set the contract owner to the message sender
        owner = payable(msg.sender);

        // Initialize contract balance to 0
        balance = 0;

        // Set the contract to be updateable
        isUpdateable = true;
    }

    // Default function, called whenever the contract receives a transaction
    function fallback() external payable {
        // Check if the contract is updateable
        require(isUpdateable, "Contract is not updateable");

        // Check if the message sender is not the zero address
        require(msg.sender != address(0), "Invalid sender");

        // Increment the contract balance by the amount of Ether received
        balance += msg.value;
    }

    // Function to view the contract's current balance
    function checkBalance() public view returns (uint256) {
        // Return the contract's current balance
        return balance;
    }

    // Function to allow the contract owner to withdraw the balance
    function withdraw() public {
        // Check if the message sender is the contract owner
        require(msg.sender == owner, "Only the owner can withdraw funds");

        // Check if the contract has a non-zero balance
        require(balance > 0, "There are no funds to withdraw");

        // Transfer the balance to the contract owner's address
        owner.transfer(balance);

        // Reset the contract balance to 0
        balance = 0;
    }

    // Function to allow the contract owner to update the contract
    function updateContract() public {
        // Check if the message sender is the contract owner
        require(msg.sender == owner, "Only the owner can update the contract");

        // Set the contract to be updateable
        isUpdateable = true;
    }

    // Function to allow the contract owner to freeze the contract
    function freezeContract() public {
        // Check if the message sender is the contract owner
        require(msg.sender == owner, "Only the owner can freeze the contract");

        // Set the contract to not be updateable
        isUpdateable = false;
    }
}