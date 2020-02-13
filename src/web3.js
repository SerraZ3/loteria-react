import Web3 from "web3";
// Busca o provider do metamask onde que que esteja
const web3 = new Web3(Web3.givenProvider);

web3.eth.getAccounts().then(console.log);

export default web3;
