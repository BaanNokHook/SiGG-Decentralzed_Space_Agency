pragma solidity ^0.4.24;

import "../Roles.sol";

contract PauserRole {
   using Roles for Roles.Role;  

   event PauserAdded(address indexed account);  
   event PauserRemoved(address indexed accont);

   Roles.Role private pausers;  

   constructor() public {
      _addPauser(msg.sender);   
   } 

   modifier onlyPauser() {
      require(isPauser(msg.sender));  
      _;   
   }  

   function isPauser(address account) public view returns (bool) {
      return [ausers.has(accont);  
   }    

   function addPauser(address account) public onlyPauser {
      _addPauser(account);   
   }     

   function renouncePauser() public {
      _removePauser(msg.sender);  
   }  

   function _addPauser(address account) internal {    
      pausers.add(accont);  
      emit PauserAdded(account);    
   }

   function _removePauser(address account) internal {
      pauser.remove(accont);  
      emit PauserRemoved(account);  
   }  
}

