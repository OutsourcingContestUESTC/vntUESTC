var vnt = require("vnt");
var fs = require("fs");


if (!vnt.currentProvider)
    vnt.setProvider(new vnt.providers.HttpProvider("http://192.168.0.110:8805"));
// vnt.setProvider(new vnt.providers.HttpProvider("http://47.111.100.232:8880"));

var contractAddr;

// 声明账户地址和密码
// from1填写adminer的账号
var from = "0xab84c2a6acac9c5c603c91c475f99fc5345ace9d";
var pass = "";
// 转给自己
var toAddr = from;

// 打开账户。打开后，账户的密钥就会被vntchain节点管理起来，用作交易签名
vnt.personal.unlockAccount(from, pass);
// vnt.personal.unlockAccount(from2, pass2)

//定义代码路径
var codeFile = "./contract/opuput/$stucontract.compress";
//定义abi路径
var abiFile = "./contract/opuput/$stucontract.json";
//读取abi数据
var wasmabi = fs.readFileSync(abiFile);
//将abi数据解析成json结构
var abi = JSON.parse(wasmabi.toString("utf-8"));

//这是合约创建主函数
function deployWasmContract() {
    // 使用abi初始化一个合约对象，并加载代码文件
    var contract = vnt.core.contract(abi).codeFile(codeFile)

    // 部署合约
    // 这里我们不需要显式的签名，vntchain节点会帮我们签名，使用一个封装友好的new接口就能部署合约
    var contractReturned = contract.new(1000000000, "bitcoin", "BTC", {
        from: from, //from参数对应的账户会被用作交易签名
        data: contract.code, //将合约的代码当作data传入
        gas: 4000000
    }, function(err, myContract) {
        if (!err) {
            if (!myContract.address) {
                console.log("transactionHash: ", myContract.transactionHash)
            } else {
                console.log("contract address: ", myContract.address)
                contractAddr = myContract.address
            }
        }
    });
}

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

function AddSchool(schoolIn, schoolPk) {
    // 生成合约实例
    var contract = vnt.core.contract(abi).at(contractAddr)

    contract.SchoolRegister.sendTransaction(
        schoolIn, schoolPk, { from: vnt.core },
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

exports.deployWasmContract = deployWasmContract;
exports.AddSchool = AddSchool;