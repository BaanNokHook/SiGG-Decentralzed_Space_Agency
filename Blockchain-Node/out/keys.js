"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ec_1 = __importDefault(require("elliptic/lib/elliptic/ec"));
const ec = new ec_1.default('secp256k1');
const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');
console.log(privateKey);
console.log(publicKey);
