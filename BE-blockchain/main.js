import { BlockChain, Transaction } from "./BlockChain/index.js";

const newBlockChain = new BlockChain();
newBlockChain.createTransactions(new Transaction("address1", "address2", 100));
newBlockChain.createTransactions(new Transaction("address2", "address1", 50));

console.log("\nStarting miner........");
newBlockChain.minePendingTransactions("minerAddress");
console.log("balance : ", newBlockChain.getBalanceOfAddress("minerAddress"));

console.log("\nStarting miner 2........");
newBlockChain.minePendingTransactions("minerAddress");
console.log("balance : ", newBlockChain.getBalanceOfAddress("minerAddress"));

console.log("\nStarting miner 3........");
newBlockChain.minePendingTransactions("minerAddress");
console.log("balance : ", newBlockChain.getBalanceOfAddress("minerAddress"));
