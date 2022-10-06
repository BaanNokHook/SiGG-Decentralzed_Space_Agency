"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = require("crypto-js");
const ec_1 = __importDefault(require("elliptic/lib/elliptic/ec"));
const ec = new ec_1.default('secp256k1');
class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = Date.now().toString();
    }
    calcHash() {
        return crypto_js_1.SHA256(this.fromAddress + this.toAddress + this.amount + this.timestamp).toString();
    }
    signTransaction(key) {
        if (key.getPublic('hex') !== this.fromAddress) {
            throw new Error('Can"t sign transactions for other wallets');
        }
        const transactionHash = this.calcHash();
        const signature = key.sign(transactionHash, 'base64');
        this.signature = signature.toDER('hex');
    }
    isValidTransaction() {
        if (this.fromAddress === null) {
            return true;
        }
        if (!this.signature || this.signature.length === 0) {
            throw new Error('Missing signature for this transaction');
        }
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calcHash(), this.signature);
    }
}
exports.default = Transaction;
