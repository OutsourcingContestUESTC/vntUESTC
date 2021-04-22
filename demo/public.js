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
var port = 8083;

app.set('views', path.join(__dirname, './html'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
// 通过配置multer的dest属性， 将文件储存在项目下的tmp文件中
app.use(multer({ dest: './tmp/' }).any())
var publicPk = web3.eth.accounts[2];
var cfContract;

var ContractHash = "asdf";


function initialization() {
    var abi;
    var bin;
    fs.readFile('./contract/stucontract_sol_stucontract.abi', 'utf-8', (err, data) => {
        if (err) throw err;
        abi = JSON.parse(data);
    });
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    var Contract = web3.eth.contract(abi);
    var cfContract = Contract.at(ContractHash);
    return cfContract;
}

const loadData = (path) => {
    try {
        return fs.readFileSync(path, 'utf8')
    } catch (err) {
        console.error(err)
        return false
    }
}

function cfVerification(cf) {
    var result = cfContract.CerticateVerification.call(cf.ID, web3.sha3(JSON.stringify(cf.info)), { from: publicPk, gas: 30000000 });
    return result[0];
}

app.get('/cfVerification', function(req, res) {
    res.render("certificateQuery.html", {
        certificateQuerySendDataUrl: url + port + "/getFile"
    });
})

app.post('/getFile', function(req, res) {
    console.log(req.files)
    var filePath = req.files[0].path + path_.parse(req.files[0].originalname).ext
    console.log(filePath);
    fs.rename(req.files[0].path, filePath, function(err) {
        if (err) {
            res.send(err)
        } else {
            filePath = './' + filePath;
            console.log(filePath);
            var data = loadData(filePath);
            console.log(data);
            var j = JSON.parse(data);
            console.log(j);
            console.log(j.info.studentNumber)
            if (cfVerification(j))
                res.json(200, { state: 200 });
            else res.json(200, { state: 201 });
        }
    })
})

var server = app.listen(port, function() {
    cfContract = initialization();
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})