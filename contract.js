window.addEventListener("load", (event) => {
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
        const web3 = new Web3(window.ethereum);
        const balance = await web3.eth.getBalance(AccountAdress);
        var AccountBalance = balance / 1000000000000000000;

        //Write to Box
        document.getElementById('adress').innerText = AccountAdress
        document.getElementById('balance').innerText = AccountBalance + " ETH"

    });

});


