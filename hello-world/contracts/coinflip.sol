pragma solidity >=0.7.3;

contract CoinFlip {
// Mapping user Funds
    mapping(address => uint) public balances;

// Add to msg.value
    function deposit() public payable{
        balances[msg.sender] += msg.value; 
    }
    
//Withdraw function
    function withdraw(uint _amount) public{
        //require arg to make sure the balance of the sender is >= _amount if not ERR
        require(balances[msg.sender]>= _amount, "Not enough ether");
        //if the amount is availabe we subtract it from the sender 
        balances[msg.sender] -= _amount;
        //True bool is called to confirm the amount
        (bool sent,) = msg.sender.call{value: _amount}("Sent");
        require(sent, "failed to send ETH");

        
    }

//Contract Balance
    function getBalance() public view returns(uint){
        return address(this).balance;
    }

//Sender Balance
    function getBalanceSender() public view returns(uint){
        return msg.sender.balance;
    }    


}