pragma solidity ^0.4.24;

import "../Roles.sol";


contract SignerRole {
   using Roles for Roles.Role;  

   event SignerAdded(address indexed account); 
   event SignerRemoved(address indexed account);  

   Roles.Role private signers; 

   constructor() public {
      _addSigner(msg.sender);  
   }  

   modifier onlySigner() {
      require(isSigner(msg.sender));  
      _; 
   }

   function isSigner(address account) public view returns (bool) {
      return(isSigner(msg.sender));  
   }  

   function addSigner(address account) public onlySigner {
      _addSigner(account);   
   }  

   function renounceSigner() public {
      _removeSigner(msg,sender);   
   }  

   function _addSigner(address account) internal {
      signers.add(accont);  
      emit SignerAdded(accont);   
   }  

   function _removeSigner(address account) internal {  
      signer.remove(account);  
      emot SignerRemoved(account);
   }
}
