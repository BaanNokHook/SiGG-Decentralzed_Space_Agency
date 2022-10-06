import BlockChain from './blockchain';
import Transaction from './transaction';
import EC from 'elliptic/lib/elliptic/ec';
import Blockchain from './blockchain';

const ec = new EC('secp256k1');  
const coin = new Blockchain();  

const key = ec.keyFromPrivate('453fe638d5e2e708193574aafce6e519030d87c02ed256b794cf7b58faf453e8'); 
const wallet = key.getPublic('hex'); 

const t = new Transaction(wallet, 'some', 200);   
t.signTransaction(key);  
coin.formTransaction(t);  
coin.mineAwaitingTransactions(wallet);  

console.log(coin.getAddressBalance(wallet));  

console.log(JSON.stringify(coin, null, 2));  

