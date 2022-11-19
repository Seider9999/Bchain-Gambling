window.addEventListener("load", (event) => {

// Hide Option Buttons
//document.getElementById('accounts').style.visibility= 'hidden';

//Get Buttons Button
const connectButton = document.getElementById("connect");
const getAccountsButton = document.getElementById("accounts");


//Button Click Connect to Metamask
connectButton.addEventListener('click', async() => {
  await ethereum.request({ method: 'eth_requestAccounts' });

});






















});