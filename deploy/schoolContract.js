var vnt = require("vnt");
var fs = require("fs");
const crypto = require('crypto');
const hash = crypto.createHash('sha256');

if (!vnt.currentProvider)
    vnt.setProvider(new vnt.providers.HttpProvider("http://192.168.0.110:8805"));
// vnt.setProvider(new vnt.providers.HttpProvider("http://47.111.100.232:8880"));

var contractAddr = "0xasdfasdfasdfasdf";

// 声明账户地址和密码
// from1填写adminer的账号
var from1 = "0x122369f04f32269598789998de33e3d56e2c507a";
var pass1 = "";
var from2 = "0x3dcf0b3787c31b2bdf62d5bc9128a79c2bb18829";
var pass2 = "";
// 转给自己
var toAddr = from1;

// 打开账户。打开后，账户的密钥就会被vntchain节点管理起来，用作交易签名
vnt.personal.unlockAccount(from1, pass1);
//定义代码路径
var codeFile = "./contract/opuput/$stucontract.compress";
//定义abi路径
var abiFile = "./contract/opuput/$stucontract.json";
//读取abi数据
var wasmabi = fs.readFileSync(abiFile);
//将abi数据解析成json结构
var abi = JSON.parse(wasmabi.toString("utf-8"));

// 该方法会每隔一秒查询一下tx的信息，直到返回一个结果，并会调用回调函数
function getTransactionReceipt(tx) {
    var receipt = vnt.core.getTransactionReceipt(tx)
    if (!receipt) {
        setTimeout(function() {
            getTransactionReceipt(tx)
        }, 1000);
    } else {
        return receipt;
    }
}

function StudentRegist(schoolName, info) {
    // 生成合约实例
    var contract = vnt.core.contract(abi).at(contractAddr)
    var infoH = vnt.sha3(info.toString());
    contract.RegisterFunc.sendTransaction(
        schoolName, infoH, { from: vnt.core },
        function(err, txid) {
            if (err) {
                console.log("error happend: ", err)
                return false;
            } else {
                var receipt = getTransactionReceipt(txid)
                    // 测试数据返回类型
                console.log("tx receipt: ", receipt)
                console.log("tx status: ", receipt.status)
                console.log("contract address: ", receipt.contractAddress)
                return receipt
            }
        })
}

function FreezeCertificate(schoolName, ID, info, date) {
    var contract = vnt.core.contract(abi).at(contractAddr)
    var infoH = vnt.sha3(info.toString());
    contract.RemokeFunc.sendTransaction(
        schoolName, infoH, { from: vnt.core },
        function(err, txid) {
            if (err) {
                console.log("error happend: ", err)
                return false;
            } else {
                var receipt = getTransactionReceipt(txid)
                    // 测试数据返回类型
                console.log("tx receipt: ", receipt)
                console.log("tx status: ", receipt.status)
                console.log("contract address: ", receipt.contractAddress)
                return receipt
            }
        })
}