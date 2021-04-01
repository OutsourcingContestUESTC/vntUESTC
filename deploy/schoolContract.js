var vnt = require("vnt");
var fs = require("fs");

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
    var infoHash = vnt.sha3(info);
    return "SUCCESS:" + String(114514);
}

function FreezeCertificate(schoolName, ID, info, date) {
    var infoHash = vnt.sha3(info);
    return true;
}