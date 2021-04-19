// geth --datadir data0 --networkid 10086 console --rpc --rpcport "8545" --allow-insecure-unlock --dev --dev.period 1
// geth --datadir dataW --networkid 1108 console --rpc --rpcport "8545" --allow-insecure-unlock
// sudo geth --datadir dataW --nodiscover --networkid 528 --ipcdisable --port 3333 --rpc --rpcport 8585 --rpcapi="db,eth,net,web3,personal" --allow-insecure-unlock --rpccorsdomain "*" console
// sudo geth --datadir dataW --nodiscover --networkid 528 --ipcdisable --port 3333 --rpc --rpcport 8585 --rpcapi="db,eth,net,web3,personal" --allow-insecure-unlock --rpccorsdomain "*" console --http --http.corsdomain https://remix.ethereum.org


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
var Contract = web3.eth.contract(abi);

//创建一个变量用于指代主账户，方便后续的操作
var account_0 = web3.eth.accounts[0]
var schoolPk = web3.eth.accounts[1]
var publicPk = web3.eth.accounts[2]
    //创建initializer，内同填充合约编译生成的bin，主要用于下一步的合约部署
var initializer = { from: account_0, data: '0x' + bin, gas: 300000 }

// 部署合约
var contract = Contract.new(initializer)

var contractAddress = contract.transactionHash

web3.eth.defaultAccount = web3.eth.coinbase

var cfContract = Contract.at(web3.eth.getTransactionReceipt(contractAddress))




var tx = { from: account_0, gas: 300000 }

var txHash = cfContract.SchoolRegister.sendTransaction("UESTC", schoolPk, { from: account_0, to: contractAddress, gas: 30000000 })


web3.eth.getTransactionReceipt(txHash)

var txHash = cfContract.CerticateVerification.sendTransaction(0, 'schoolPk', { from: account_0, to: contractAddress, gas: 30000000 })


var filter = web3.eth.filter("pending")

filter.watch(function(error, log) {
    console.log(log)
});

var txHash = cfContract.say.sendTransaction({ from: account_0, gas: 3000000 })
cfContract.say.call()