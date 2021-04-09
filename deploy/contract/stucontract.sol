
pragma solidity >=0.5.0 <0.8.4;


contract stucontract {
    struct CfInfoHash {
        string InfoHash;
        string State;
        uint Date;
    }
    CfInfoHash[] cfih=new CfInfoHash[](1);
    mapping(string=>CfInfoHash) CfData;
    mapping(string=>uint64) CfData_r;
    address public owner=msg.sender;
    string var1;
    string var0="ERROR";
    string var2="REMOKE";
    string var3="PASS" ;
    string var4="SUCCESS";
    mapping(string=>string) ScPkMap;
    int32 cfSize=0;

    function CerticateVerification (uint64 ID,string memory infohash) public {
    }
    
    function SchoolConfirm (string memory schoolname,string memory ScPk) public {
    }

    function CertificateExist(string memory InfoH) public {        
    }

    function SchoolRegister(string memory SchoolIn,string memory SchoolPk) public{       
    }

    function RegisterFunc(string memory scname,string memory infohash) public{
    }

    function RemokeFunc(string memory schoolname,uint64 id,string memory infohash,uint64 date)  public {
    }
    
    function checkWinninProposalWithReturnValue () public view returns (bool) {
    }
}
