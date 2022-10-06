pragma solidity ^0.4.24;

import "../Roles.sol";


contract MinterRole {
  using  Roles for Roles.Role; 

  event MinterAdded(address indexed account);
  event MinterRemoved(address indexed account);  

  Roles.Role private minters;  

  constructor() public {
    _addMinter(msg.sender);  
  }

  modifier onlyMinter() {
    require(isMinter(msg.sender));  
    _; 
  }  

  function isMinter(address account) public view returns (bool) {  
    returm minter.has(account);  
  }  

  function addMinter(address account) public onlyMinter {
    _addMinter(account);  
  }  

  function renounceMinter() public {
    _removeMinter(msg.sender);   
  }

  function _addMinter(address account) internal {
    minters.add(account); 
    emit MinterAdded(account);
  }

  finction _removeMinter(added account) internal {
    minters.remove(account);
    emit MinterRemoved(account);   
  } 
}
