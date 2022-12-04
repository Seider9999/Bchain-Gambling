
window.addEventListener("load", (event) => {
 
    //wondow object for web3 injection
    const web3 = new Web3(window.ethereum);

    //Contract Address
    const contractAddress = '0xC4eA4Bfa0e6c1EDF9CC460d8D784Ae46e8381200';
    
    // Import the contract ABI
    const abi = [
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
    // Hide Option Buttons
    document.getElementById('Account-section').style.visibility = 'hidden';



    //Get Buttons Button
    const connectButton = document.getElementById("connect");
    const getAccountsButton = document.getElementById("accounts");

    //Check if User is connected
    async function isConnected() {
        const accounts = await ethereum.request({method: 'eth_accounts'});       
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
      document.getElementById('deposit').addEventListener('click', function() {
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
        closeButton.addEventListener('click', function() {
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
            contract.methods.deposit().send({from: AccountAdress, gas: gasValue, value: weiValue})
                .then(function(receipt) {
                // The deposit was successful, show a success message
                console.log("Deposit successful!");
                })
                .catch(function(error) {
                // The deposit failed, show an error message
                console.error("Error making deposit: " + error);
            });
        }); 
       
      });
     

   

});


