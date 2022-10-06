"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
class Block {
    constructor(height, transactions, timestamp, prevHash) {
        this.height = height;
        this.transactions = transactions;
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = this.calHash();
        this.nonce = 0;
    }
    calHash() {
        return crypto_js_1.SHA256(this.height + this.prevHash + this.timestamp + JSON.stringify(this.transactions + this.nonce).toString());
    }
    ;
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calHash();
        }
        console.log(`Mined Block: ${this.hash}`);
    }
    hasValidTransactions() {
        for (const trans of this.transactions) {
            if (!trans.isValidTransaction()) {
                return false;
            }
        }
        return true;
    }
}
exports.default = Block;
function mineBlock(difficulty) {
    throw new Error('Function not implemented.');
}
function hasValidTransactions() {
    throw new Error('Function not Implemented.');
}
