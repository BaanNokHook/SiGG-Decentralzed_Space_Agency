"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = __importDefault(require("./block"));
const transaction_1 = __importDefault(require("./transaction"));
class Blockchain {
    constructor() {
        this.chain = [this.generateGenesisBlock()];
        this.awaitingTransactions = [];
        this.difficulty = 2;
        this.miningReward = 100;
        this.blockHeight = 1;
    }
    generateGenesisBlock() {
        return new block_1.default(0, 'Genesis block', Date.now().toString(), '0');
    }
    getLastBlockHash() {
        return this.chain[this.chain.length - 1].hash;
    }
    mineAwaitingTransactions(rewardAddress) {
        const transactionReward = new transaction_1.default(null, rewardAddress, this.miningReward);
        this.awaitingTransactions.push(transactionReward);
        const block = new block_1.default(this.blockHeight, this.awaitingTransactions, Date.now().toString(), this.getLastBlockHash());
        block.mineBlock(this.difficulty);
        console.log('Successful mining');
        this.chain.push(block);
        this.awaitingTransactions = [];
    }
    formTransaction(transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('No address specified!');
        }
        if (!transaction.isValidTransaction()) {
            throw new Error('Invalid transaction');
        }
        if (transaction.amount <= 0) {
            throw new Error('Transaction amount should be higher than 0');
        }
        // if (this.getAddressBalance(transaction.fromAddress) < transaction.amount) {
        //   throw new Error('Not enough balance');
        // }
        this.awaitingTransactions.push(transaction);
    }
    getAddressBalance(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transactions) {
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
    isValidChain() {
        for (let i = 1; i < this.chain.length; i++) {
            const currBlock = this.chain[i];
            if (!currBlock.hasValidTransactions()) {
                return false;
            }
            if (currBlock.hash !== currBlock.calcHash()) {
                return false;
            }
        }
        return true;
    }
}
exports.default = Blockchain;
