
window.addEventListener("load", (event) => {

  //wondow object for web3 injection
  const web3 = new Web3(window.ethereum);

  //Contract Address
  const contractAddress = '0x9616d9D43fA31374f726042d7c6655864e5Ecc5c';

  // Import the contract ABI
  const abi = [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_airnodeRrp",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "requestId",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "response",
              "type": "uint256"
            }
          ],
          "name": "ReceivedUint256",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "bytes32",
              "name": "requestId",
              "type": "bytes32"
            }
          ],
          "name": "RequestedUint256",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "airnode",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "airnodeRrp",
          "outputs": [
            {
              "internalType": "contract IAirnodeRrpV0",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "balances",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "deposit",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "endpointIdUint256",
          "outputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
            }
          ],
          "name": "expectingRequestWithIdToBeFulfilled",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes32",
              "name": "requestId",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "fulfillUint256",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_user",
              "type": "address"
            }
          ],
          "name": "getBalanceSender",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getRandom",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "makeRequestUint256",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "randomNumberReturn",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_airnode",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "_endpointIdUint256",
              "type": "bytes32"
            },
            {
              "internalType": "address",
              "name": "_sponsorWallet",
              "type": "address"
            }
          ],
          "name": "setRequestParameters",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "sponsorWallet",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
  ];

  // Create an instance of the contract using the contract ABI and address
  const contract = new web3.eth.Contract(abi, contractAddress);

  isConnected();
  getBalance();
  getUserBalance();

  // Hide Option Buttons
  document.getElementById('Account-section').style.visibility = 'hidden';


  //Get Buttons Button
  const connectButton = document.getElementById("connect");
  const getAccountsButton = document.getElementById("accounts");
  const withdrawButton = document.getElementById("withdraw");

  //Check if User is connected
  async function isConnected() {
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (accounts.length) {
      console.log(`You're connected to: ${accounts[0]}`);
      document.getElementById('Account-section').style.visibility = 'visible';
    } else {
      console.log("Metamask is not connected");
    }
  }


  //Button Click Connect to Metamask
  connectButton.addEventListener('click', async () => {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      document.getElementById('Account-section').style.visibility = 'visible';
    } catch (error) {
      if (error.code === 4001) {
        console.log('User Rejected connection to Metamask ERRORCODE 4001');
      } else {
        console.error(error);
      }
    }
  });

  //Button Get Account Information
  getAccountsButton.addEventListener('click', async () => {
    //Call ETH Accounts
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    //Display first Adress connected
    const AccountAdress = accounts[0] || 'Not able to get accounts // Please Connect your Wallet';

    //Get Balance
    const balance = await web3.eth.getBalance(AccountAdress);
    var AccountBalance = balance / 1000000000000000000;

    //Write to Box
    document.getElementById('adress').innerText = AccountAdress
    document.getElementById('balance').innerText = AccountBalance + " ETH"
  });


  // Create a function that will open the popup window when the button is clicked
  document.getElementById('deposit').addEventListener('click', function () {
    // Popup-Element erstellen
    const popup = document.createElement('div');
    popup.classList.add('popup');

    // Titel erstellen
    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = 'Deposit';
    popup.appendChild(title);

    // Untertitel erstellen
    const subtitle = document.createElement('h2');
    subtitle.classList.add('subtitle');
    subtitle.textContent = 'Enter the amount to deposit:';
    popup.appendChild(subtitle);

    // Eingabefeld erstellen
    const input = document.createElement('input');
    input.type = 'number';
    input.classList.add('input');
    popup.appendChild(input);
    input.id = 'inputField';

    // Deposit-Button erstellen
    const depositButton = document.createElement('button');
    depositButton.textContent = 'Deposit';
    depositButton.classList.add('button', 'deposit-button');
    popup.appendChild(depositButton);
    depositButton.id = 'depositButton';

    // Schließen-Button erstellen
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.classList.add('button', 'close-button');
    popup.appendChild(closeButton);

    // Popup zum Dokument hinzufügen
    document.body.appendChild(popup);

    // Event-Listener für Klick auf Schließen-Button hinzufügen
    closeButton.addEventListener('click', function () {
      // Popup entfernen
      popup.remove();
    });

    ///
    // Deposit function
    ///
    document.getElementById('depositButton').addEventListener('click', async () => {
      //Call ETH Accounts
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      //Display first Adress connected
      const AccountAdress = accounts[0] || 'Not able to get accounts // Please Connect your Wallet';
      // Get the value of the #inputField element
      var etherAmount = $("#inputField").val();
      var gasValue = 500000;
      // Convert the ether amount to the equivalent value in wei
      const weiValue = Web3.utils.toWei(etherAmount);
      // Call the deposit() function in the contract
      contract.methods.deposit().send({ from: AccountAdress, gas: gasValue, value: weiValue })
        .then(function (receipt) {
          // The deposit was successful, show a success message
          alert('Success: Funds deposited successfully.');
          console.log("Deposit successful!");
        })
        .catch(function (error) {
          // The deposit failed, show an error message
          console.error("Error making deposit: " + error);
          alert('Error: Fund could not be deposited into Contract');
        });
    });
  });

  //
  // Get Balance of Contract
  //
  async function getBalance() {
    // Use the contract object to call the getBalance() function
    contract.methods.getBalance().call(function (error, result) {
      if (error) {
        console.error(error);
      } else {
        // If there was no error, display the balance in the input field
        resultETH = Web3.utils.fromWei(result);
        if (resultETH > 0) {
          // If the balance is more than zero, display it
          document.getElementById('balanceContract').innerText = resultETH + " ETH";
        } else {
          // If the balance is zero, display a message
          document.getElementById('balanceContract').innerText = "No Funds In contract";
        }
      }
    });
  }

  //
  // Get Balance of Contract Sender
  //
// Call the getBalanceUser function with the specified user address
async function getUserBalance(){
//Call ETH Accounts
const accounts = await ethereum.request({ method: 'eth_accounts' });

//Display first Adress connected
const AccountAdress = accounts[0] || 'Not able to get accounts // Please Connect your Wallet';
contract.methods.getBalanceSender(AccountAdress).call(function (error, result) {
  resultETH = Web3.utils.fromWei(result);
  document.getElementById('balanceContractSender').innerText = resultETH + " ETH";

});
 
  }


  //Withdraw button
  withdrawButton.addEventListener('click', async () => {
    // Popup-Element erstellen
    const popup = document.createElement('div');
    popup.classList.add('popup');

    // Titel erstellen
    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = 'Withdraw';
    popup.appendChild(title);

    // Untertitel erstellen
    const subtitle = document.createElement('h2');
    subtitle.classList.add('subtitle');
    subtitle.textContent = 'Enter the amount to withdraw:';
    popup.appendChild(subtitle);

    // Eingabefeld erstellen
    const input = document.createElement('input');
    input.type = 'number';
    input.classList.add('input');
    popup.appendChild(input);
    input.id = 'inputFieldWithdraw';

    // Deposit-Button erstellen
    const depositButton = document.createElement('button');
    depositButton.textContent = 'Withdraw';
    depositButton.classList.add('button', 'deposit-button');
    popup.appendChild(depositButton);
    depositButton.id = 'withdrawButtonPopUp';

    // Schließen-Button erstellen
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.classList.add('button', 'close-button');
    popup.appendChild(closeButton);

    // Popup zum Dokument hinzufügen
    document.body.appendChild(popup);

    // Event-Listener für Klick auf Schließen-Button hinzufügen
    closeButton.addEventListener('click', function () {
      // Popup entfernen
      popup.remove();
    });

    //
    // Withdraw Function
    //
    withdrawButtonPopUp.addEventListener('click', async () => {

       //Call ETH Accounts
       const accounts = await ethereum.request({ method: 'eth_accounts' });

       //Display first Adress connected
       const AccountAdress = accounts[0] || 'Not able to get accounts // Please Connect your Wallet';
      
       // Get the amount to withdraw from the input field
      var etherAmount = $("#inputFieldWithdraw").val();
     
      // Convert the ether amount to the equivalent value in wei
      const _amount = Web3.utils.toWei(etherAmount);

      // Use the contract object to call the withdraw() function
      contract.methods.withdraw(_amount).send({
        from: AccountAdress
      }, function (error, result) {
        if (error) {
          // If there was an error, log it to the console
          console.error(error);
        } else {
          // If there was no error, log the result to the console
          console.log(result);
        }
      });

    });
  });




});


