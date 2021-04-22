var express = require('express');
var ejs = require('ejs');
var path = require("path");
var path_ = path;
var bodyParser = require('body-parser');
var Web3 = require('web3');
var fs = require('fs');
// 引入multer中间件，用于处理上传的文件数据
const multer = require('multer');
var moment = require('moment');
const { encrypt, decrypt } = require('./crypto');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/html', express.static('html'));
app.use(express.static(path.join(__dirname, '/html')));

var url = 'http://47.111.xxx.xx:';
var port = 8082;

app.set('views', path.join(__dirname, './html'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
// 通过配置multer的dest属性， 将文件储存在项目下的tmp文件中
app.use(multer({ dest: './tmp/' }).any())
var account_0 = web3.eth.accounts[0];
var admin = account_0;
var cfContract;


function initialization() {
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

    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    var Contract = web3.eth.contract(abi);
    var initializer = { from: account_0, data: '0x' + bin, gas: 300000 };
    var contract = Contract.new(initializer);

    var contractAddress = contract.transactionHash;
    web3.eth.defaultAccount = web3.eth.coinbase;
    var cfContract = Contract.at(web3.eth.getTransactionReceipt(contractAddress));
    return cfContract;
}

function sleep(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time);
    });
}

function get(tH) {
    var result;
    while (true) {
        result = web3.eth.getTransactionReceipt(tH);
        if (result) return result.decodeOutput;
        else {
            sleep(5000);
        }
    }
}

function addScPk(schoolName, schoolPk) {
    var th = cfContract.SchoolRegister.sendTransaction(schoolName, schoolPk, { from: admin, gas: 30000000 });
    return get(th)[0];
}

app.get('/admin', function(req, res) {
    console.log("getAdminHtml");
    res.render("adminAdd.html", {
        sendDataUrl: url + port + '/admin',
        result: ''
    });
})

app.post('/admin', function(req, res) {
    console.log("postDataAdminHtml");
    var schoolName = req.body.schoolName;
    var schoolPk = req.body.publicKey;
    if (addScPk(schoolName, schoolPk))
        res.json(200, { state: 201, status: 201 });
    else
        res.json(200, { state: 200, status: 200 });
})

var server = app.listen(port, function() {
    cfContract = initialization();
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})