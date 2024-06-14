import SHA256 from "crypto-js";
import { DIFFICULTY, MINE_REWARD } from "./constants.js";

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block {
  constructor(timestamp, transaction, previousHash) {
    this.timestamp = timestamp;
    this.transaction = transaction;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256.SHA256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transaction) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined: " + this.hash);
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = DIFFICULTY;
    this.miningReward = MINE_REWARD;
    this.pendingTransactions = [];
  }

  createGenesisBlock() {
    return new Block(new Date().getTime(), "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(new Date().getTime(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log("Block successfully mined");
    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
  }

  createTransactions(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transaction) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

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
