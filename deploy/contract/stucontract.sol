// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0 ;


contract stucontract {
    struct CfInfoHash {
        string InfoHash;
        string State;
        uint256 Date;
    }
    struct AdminStruct{
         string id  ;//ID
         string password ;//密码
    }

    mapping(uint64=>CfInfoHash) CfData;
    mapping(string=>uint64) CfData_r;
    mapping (address=>AdminStruct) adm;
    mapping(string=>address) ScPkMap;

    address public owner;

    string var0="ERROR";
    string var1="REMOKE SUCCESS";
    string var2="REMOKE";
    string var3="PASS" ;
    string var4="SUCCESS";

    
    uint64 cfSize=0;

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

    function addressCompareInternal(address _a1,address _a2) internal returns (bool){
        return  _a1==_a2;    
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
    
    function SchoolConfirm (string memory schoolname,address ScPk) internal returns (bool) {
        return addressCompareInternal(ScPkMap[schoolname],ScPk);
    }

    function CertificateExist(string memory InfoH) public returns (uint64) {        
        if(StringhashCompareInternal(CfData[CfData_r[InfoH]].InfoHash,InfoH))
        return CfData_r[InfoH];
        else
        emit e(msg.sender,var0);
        return 0;
    }
    
    function SchoolExist(string memory schooln) internal returns (bool) {
        address _a;
        return addressCompareInternal(ScPkMap[schooln],_a);
    }

    function SchoolRegister(string memory SchoolIn) public admin returns (bool) {       
        address SchoolPk=msg.sender;
        if(SchoolExist(SchoolIn)){ 
            ScPkMap[SchoolIn]=SchoolPk;
            return true;}
        else{
             emit e(msg.sender,var0);      
             return false;
    }}

    function RegisterFunc(string memory scname,string memory infohash,uint256 now_) public returns (string memory _state,uint64 _id) {
        address scpk;
        scpk=msg.sender;
        if(SchoolConfirm(scname,scpk)){
            uint64 id=CertificateExist(infohash);
            if(id==0){
                id=cfSize;cfSize++;
            }
            else{
                if(StringhashCompareInternal(CfData[id].State,var3))
                return (var3,id);
                else if(now_<CfData[id].Date) return (var2,id);
                {
                    CfData[id].Date=now_;CfData[id].State=var3;return (var4,id);
                }
            }
            CfData[id].InfoHash=infohash;
            CfData[id].State=var3;
            CfData[id].Date=now_;
            CfData_r[infohash]=id;
            return(var4,id);
        }  
        return (var0,0);
    }

    function RemokeFunc(string memory schoolname,uint64 _id,string memory _infohash,uint256 _now)  public returns (bool) {
        address _scpk;
        _scpk=msg.sender;
        if(SchoolConfirm(schoolname,_scpk)){
            if(StringhashCompareInternal(CfData[_id].InfoHash,_infohash)){
                CfData[_id].State=var2;
                CfData[_id].Date=_now;
                emit e(msg.sender,var1);
                return true;
            }
        }
        emit e(msg.sender,var0);
        return false;
    }
}