//使用web3模块
var Web3 = require('web3');

var fs = require('fs');
var abi;

var bin;

fs.readFile('./contract/stucontract_sol_stucontract.abi', 'utf-8', (err, data) => {
    if (err) throw err;
    abi = JSON.parse(data);
});

fs.readFile('./contract/stucontract_sol_stucontract.bin', 'utf-8', (err, data) => {
    if (err) throw err;
    bin = data;
});

//创建web3实例，并连接私有链（假设私有链监听8545端口）
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


//创建智能合约，参数为solc编译后生成的abi
// var Contract = new web3.eth.Contract(abi);

//创建一个变量用于指代主账户，方便后续的操作
var account_0 = web3.eth.accounts.create()
var MyContract = new web3.eth.Contract(abi, { from: account_0.address, gasPrice: '1597262155', gas: 3000000, data: '0x' + bin });


//创建initializer，内同填充合约编译生成的bin，主要用于下一步的合约部署
var initializer = { from: account_0, data: '0x' + bin, gas: 300000 }

//部署合约
// var contract = Contract.deplay(initializer)


MyContract.deploy({
    data: '0x' + bin,
    arguments: [123, 'My String']
}).send({
    from: account_0.address,
    gas: 1500000,
    gasPrice: '30000000000000'
}, function(error, transactionHash) {});