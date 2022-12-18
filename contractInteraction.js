
window.addEventListener("load", (event) => {

  //wondow object for web3 injection
  const web3 = new Web3(window.ethereum);

  //Contract Address
  const contractAddress = '0xafaff8728dAF0E2F37dB28282E40fE24C2333761';

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
          "inputs": [
            {
              "internalType": "uint256",
              "name": "betAmount",
              "type": "uint256"
            }
          ],
          "name": "betOnEven",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "betAmount",
              "type": "uint256"
            }
          ],
          "name": "betOnOdd",
          "outputs": [],
          "stateMutability": "payable",
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

  ///////
  // GAMBLE BUTTON
  //////
  document.getElementById('gamble').addEventListener('click', function () {
    // Popup-Element erstellen
    const popup = document.createElement('div');
    popup.classList.add('popup');

    // Titel erstellen
    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = 'Gamble';
    popup.appendChild(title);

    // Untertitel erstellen
    const subtitle = document.createElement('h2');
    subtitle.classList.add('subtitle');
    subtitle.textContent = 'Enter the amount to bet:';
    popup.appendChild(subtitle);

    // Eingabefeld erstellen
    const input = document.createElement('input');
    input.type = 'number';
    input.classList.add('input');
    popup.appendChild(input);
    input.id = 'inputField';

    //Münze Erstellen
    const imgCoin = document.createElement('img');
    imgCoin.src = 'img/gamble0.png';
    imgCoin.width = 200;
    imgCoin.height = 200;
    imgCoin.style.display = 'block';
    imgCoin.style.margin = 'auto';
    popup.appendChild(imgCoin);

    // Untertitel Progress erstellen
    const subtitle2 = document.createElement('h2');
    subtitle2.classList.add('subtitle');
    subtitle2.textContent = 'Confirm the Fee, then wait, betting is in progress!';
    popup.appendChild(subtitle2);
    subtitle2.id = 'subtitle2';
    subtitle2.style.visibility = 'hidden';

    // Untertitel WIN erstellen
    const subtitlewin = document.createElement('h2');
    subtitlewin.classList.add('subtitle');
    subtitlewin.textContent = 'Congratulations, you won!';
    popup.appendChild(subtitlewin);
    subtitlewin.id = 'subtitlewin';
    subtitlewin.style.visibility = 'hidden';

    // Untertitel LOSS erstellen
    const subtitleloss = document.createElement('h2');
    subtitleloss.classList.add('subtitle');
    subtitleloss.textContent = 'So sorry, you lost!';
    popup.appendChild(subtitleloss);
    subtitleloss.id = 'subtitleloss';
    subtitleloss.style.visibility = 'hidden';


    // Betting-Button 1 erstellen
    const depositButton = document.createElement('button');
    depositButton.textContent = 'Bet on 1';
    depositButton.classList.add('button', 'deposit-button');
    popup.appendChild(depositButton);
    depositButton.id = 'betButton';

    // Betting-Button 2 erstellen
    const depositButton2 = document.createElement('button');
    depositButton2.textContent = 'Bet on 2';
    depositButton2.classList.add('button', 'deposit-button2');
    popup.appendChild(depositButton2);
    depositButton2.id = 'betButton2';

    // Schließen-Button erstellen
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.classList.add('button', 'close-button');
    popup.appendChild(closeButton);
    closeButton.id = 'closeButton';

    // Popup zum Dokument hinzufügen
    document.body.appendChild(popup);

    // Event-Listener für Klick auf Schließen-Button hinzufügen
    closeButton.addEventListener('click', function () {
      // Popup entfernen
      popup.remove();
    });

    ///
    // BETTING FUNCTION 1 FOR EVEN
    ///
    document.getElementById('betButton').addEventListener('click', async () => {
      //define Input field and unser balance
      var etherAmountBet = $("#inputField").val();

      //Get user Balance and Contract balance


      if (etherAmountBet > 0) {
        //hide Buttons
        document.getElementById('betButton').style.visibility = 'hidden';
        document.getElementById('betButton2').style.visibility = 'hidden';
        document.getElementById('subtitle2').style.visibility = 'visible';
        document.getElementById('closeButton').style.visibility = 'hidden';
        //Transition animation
        let currentImage = 0;
        const images = ['img/gamble1.png', 'img/gamble2.png'];
        setInterval(() => {
          currentImage = (currentImage + 1) % images.length;
          imgCoin.src = images[currentImage];
        }, 200); // switch images every 1000 milliseconds (1 second)

        // Get the value from the input field
        const betAmountbefore = document.getElementById('inputField').value;
        const betAmount = Web3.utils.toWei(betAmountbefore);

        //////////////////////////////////////
        //Call MakeRequestUINT
        //////////////////////////////////////
        //Call ETH Accounts
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        const AccountAdress = accounts[0] || 'Not able to get accounts // Please Connect your Wallet';

        //Call Function MakeRequest
        contract.methods.betOnEven(betAmount).send({ from: AccountAdress })
          .then(function (receipt) {
            console.log("Success: gamble Initiated");
            //Dig Deeper and get randomnumber
            contract.methods.getRandom().call(function (error, result) {
              randomNumber = result
              console.log("Fetching Randomn Number");
              console.log("Randomn Number: " + randomNumber);
              console.log("Initiating Request for new Random Number");
              //Display winner or loser content
              if (randomNumber % 2 == 0) {
                //Winner
                console.log("User won, increasing Balance");
                document.getElementById('subtitlewin').style.visibility = 'visible';
                document.getElementById('subtitle2').style.visibility = 'hidden';
                document.getElementById('closeButton').style.visibility = 'visible';
                //Set Image 1
                clearInterval(intervalId);
                imgCoin.src = 'img/gamble1.png';
              } else {
                console.log("User lost, cutting Balance");
                document.getElementById('subtitleloss').style.visibility = 'visible';
                document.getElementById('subtitle2').style.visibility = 'hidden';
                document.getElementById('closeButton').style.visibility = 'visible';
                //Set Image 2
                clearInterval(intervalId);
                imgCoin.src = 'img/gamble2.png';
              }



            });

          }).catch(function (error) {
            console.log("Error");
          });



      } else {
        alert('Error: Please choose a correct Betting Amount');
      }


    });

    ///
    // BETTING FUNCTION 2
    ///
    document.getElementById('betButton2').addEventListener('click', async () => {
      //Transition animation
      let currentImage = 0;
      const images = ['img/gamble1.png', 'img/gamble2.png'];
      setInterval(() => {
        currentImage = (currentImage + 1) % images.length;
        imgCoin.src = images[currentImage];
      }, 200); // switch images every 1000 milliseconds (1 second)
    });

  });









});


