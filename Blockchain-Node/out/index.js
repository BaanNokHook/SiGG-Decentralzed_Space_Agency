"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = __importDefault(require("./transaction"));
const ec_1 = __importDefault(require("elliptic/lib/elliptic/ec"));
const blockchain_1 = __importDefault(require("./blockchain"));
const ec = new ec_1.default('secp256k1');
const coin = new blockchain_1.default();
const key = ec.keyFromPrivate('453fe638d5e2e708193574aafce6e519030d87c02ed256b794cf7b58faf453e8');
const wallet = key.getPublic('hex');
const t = new transaction_1.default(wallet, 'some', 200);
t.signTransaction(key);
coin.formTransaction(t);
coin.mineAwaitingTransactions(wallet);
console.log(coin.getAddressBalance(wallet));
console.log(JSON.stringify(coin, null, 2));
