// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0 ;


contract stucontract {
    struct CfInfoHash {
        string InfoHash;
        string State;
        uint Date;
    }
    struct AdminStruct{

         string id  ;//ID

         string password ;//密码

    }

    mapping(uint64=>CfInfoHash) CfData;
    mapping(string=>uint64) CfData_r;
    mapping (address=>AdminStruct) adm;
    address public owner;
    string var1;
    string var0="ERROR";
    string var2="REMOKE";
    string var3="PASS" ;
    string var4="SUCCESS";
    mapping(string=>string) ScPkMap;
    uint cfSize=0;

    event e(address addr,string message);

    constructor() public {

        owner=msg.sender;

        adm[msg.sender].id="admin";

        adm[msg.sender].password="123456";

    }
    modifier admin(){
        require(owner==msg.sender);
        _;
    }

    function StringhashCompareInternal(string memory a, string memory b) internal returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    function CerticateVerification (uint64 ID,string memory infohash) public returns (bool) {
        if(StringhashCompareInternal(infohash,CfData[ID].InfoHash))
        {
            if (StringhashCompareInternal(var3,CfData[ID].State)){
             emit e(msg.sender,var4);
             return true;
            }
            revert();
        }
        emit e(msg.sender,var0);
        return false;
    }
    
    function SchoolConfirm (string memory schoolname,string memory ScPk) public returns (bool) {
        return StringhashCompareInternal(ScPkMap[schoolname],ScPk);
    }

    function CertificateExist(string memory InfoH) public returns (uint64) {        
        if(StringhashCompareInternal(CfData[CfData_r[InfoH]].InfoHash,InfoH))
        return CfData_r[InfoH];
        else
        emit e(msg.sender,var0);
        return -1;
    }
    
    function SchoolExist(string memory schooln) public returns (bool) {
        return StringhashCompareInternal(ScPkMap[schooln],"");
    }

 /*  function SchoolRegister(string storage SchoolIn,string storage SchoolPk) public returns (bool) {       
    
    }

    function RegisterFunc(string storage scname,string storage infohash) public returns (bool) {
    
    }

    function RemokeFunc(string storage schoolname,uint64 id,string storage infohash,uint date)  public returns (bool) {
    
    }*/
}