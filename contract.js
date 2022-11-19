window.addEventListener("load", (event) => {

// Hide Option Buttons
document.getElementById('Account-section').style.visibility= 'visible';



//Get Buttons Button
const connectButton = document.getElementById("connect");
const getAccountsButton = document.getElementById("accounts");

//Check if User is connected



//Button Click Connect to Metamask
connectButton.addEventListener('click', async() => {
    try {
        await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
        if (error.code === 4001) {
            console.log('User Rejected connection to Metamask ERRORCODE 4001');
        } else {
            console.error(error);
        }
    }
});



getAccountsButton.addEventListener('click', async () => {
    //Call ETH Accounts
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const balance = await ethereum.request({ method: 'eth_getBalance', params:[accounts[0],"latest"]  });
    
    //Display first Adress connected
    const AccountAdress = accounts[0] || 'Not able to get accounts // Please Connect your Wallet';
    const AccountBalance = balance[0] || 'Not able to get accounts // Please Connect your Wallet';

     //Write to Box
     document.getElementById('adress').innerText = AccountAdress
     document.getElementById('balance').innerText = AccountBalance

   

     
  });










});


