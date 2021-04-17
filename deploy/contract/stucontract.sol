// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract stucontract {
    struct CfInfoHash {
        string InfoHash;
        string State;
        uint256 Date;
    }
    struct AdminStruct {
        string id; //ID
        string password; //密码
    }

    mapping(uint64 => CfInfoHash) CfData;
    mapping(string => uint64) CfData_r;
    mapping(address => AdminStruct) adm;
    address public owner;
    string var0 = "ERROR";
    string var1 = "REMOKE SUCCESS";
    string var2 = "REMOKE";
    string var3 = "PASS";
    string var4 = "SUCCESS";
    uint256 public time;
    mapping(string => string) ScPkMap;
    uint64 cfSize = 0;

    event e(address addr, string message);

    constructor() public {
        owner = msg.sender;

        adm[msg.sender].id = "admin";

        adm[msg.sender].password = "123456";
    }

    modifier admin() {
        require(owner == msg.sender);
        _;
    }

    function StringhashCompareInternal(string memory a, string memory b)
        internal
        returns (bool)
    {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    function CerticateVerification(uint64 ID, string memory infohash)
        public
        returns (bool)
    {
        if (StringhashCompareInternal(infohash, CfData[ID].InfoHash)) {
            if (StringhashCompareInternal(var3, CfData[ID].State)) {
                emit e(msg.sender, var4);
                return true;
            }
            revert();
        }
        emit e(msg.sender, var0);
        return false;
    }

    function SchoolConfirm(string memory schoolname, string memory ScPk)
        public
        returns (bool)
    {
        return StringhashCompareInternal(ScPkMap[schoolname], ScPk);
    }

    function CertificateExist(string memory InfoH) public returns (uint64) {
        if (StringhashCompareInternal(CfData[CfData_r[InfoH]].InfoHash, InfoH))
            return CfData_r[InfoH];
        else emit e(msg.sender, var0);
        return 0;
    }

    function SchoolExist(string memory schooln) public returns (bool) {
        return StringhashCompareInternal(ScPkMap[schooln], "");
    }

    function SchoolRegister(string memory SchoolIn, string memory SchoolPk)
        public
        admin
        returns (bool)
    {
        if (SchoolExist(SchoolIn)) {
            ScPkMap[SchoolIn] = SchoolPk;
            return true;
        } else {
            emit e(msg.sender, var0);
            return false;
        }
    }

    function getDate() internal returns (uint256) {
        time = now;
        return (time);
    }

    function RegisterFunc(string memory scname, string memory infohash)
        public
        returns (string memory _state, uint64 _id)
    {
        string memory scpk;
        uint256 tim = getDate();
        scpk = ScPkMap[scname];
        if (SchoolConfirm(scname, scpk)) {
            uint64 id = CertificateExist(infohash);
            if (id == 0) {
                id = cfSize;
                cfSize++;
            } else {
                if (StringhashCompareInternal(CfData[id].State, var3))
                    return (var3, id);
                else if (tim < CfData[id].Date) return (var2, id);
                {
                    CfData[id].Date = tim;
                    CfData[id].State = var3;
                    return (var4, id);
                }
            }
            CfData[id].InfoHash = infohash;
            CfData[id].State = var3;
            CfData[id].Date = tim;
            CfData_r[infohash] = id;
            return (var4, id);
        }
        return (var0, 0);
    }

    function RemokeFunc(
        string memory schoolname,
        uint64 _id,
        string memory _infohash
    ) public returns (bool) {
        string memory _scpk;
        uint256 _date = getDate();
        _scpk = ScPkMap[schoolname];
        if (SchoolConfirm(schoolname, _scpk)) {
            if (StringhashCompareInternal(CfData[_id].InfoHash, _infohash)) {
                CfData[_id].State = var2;
                CfData[_id].Date = _date;
                emit e(msg.sender, var1);
                return true;
            }
        }
        emit e(msg.sender, var0);
        return false;
    }

    function RemokeFunc(string memory asdf) public returns (string) {
        return asdf;
    }
}
