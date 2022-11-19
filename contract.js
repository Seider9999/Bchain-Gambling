window.addEventListener("load", (event) => {

// Hide Option Buttons
//document.getElementById('accounts').style.visibility= 'hidden';

//Get Buttons Button
const connectButton = document.getElementById("connect");
const getAccountsButton = document.getElementById("accounts");
const getAccountsResult = 0;


//Button Click Connect to Metamask
connectButton.addEventListener('click', async() => {
  await ethereum.request({ method: 'eth_requestAccounts' });
});



getAccountsButton.addEventListener('click', async () => {
    //we use eth_accounts because it returns a list of addresses owned by us.
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    //We take the first address in the array of addresses and display it
    getAccountsResult.innerHTML = accounts[0] || 'Not able to get accounts';
  });




















});