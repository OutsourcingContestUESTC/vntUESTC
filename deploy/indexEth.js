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

var url = 'http://47.111.100.88:';
var port = 8081;

app.set('views', path.join(__dirname, './html'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
// 通过配置multer的dest属性， 将文件储存在项目下的tmp文件中
app.use(multer({ dest: './tmp/' }).any())
var account_0 = web3.eth.accounts[0];
var admin = account_0;
var schoolPk = web3.eth.accounts[1];
var publicPk = web3.eth.accounts[2];
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

const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}

function check(stdId, pwd) {
    if (stdId == '2018123401001' && pwd == '1234567890')
        return {
            state: true,
            info: {
                name: '王小明',
                from: '北京',
                sex: '男',
                nationality: '汉',
                IDNumber: '444444444444444',
                studentNumber: '2018123401001',
                major: '计算机系统与技术',
                school: '华夏人民大学',
                graduationCertificateNo: '1145141919'
            }
        };
    if (stdId == '2017432109009' && pwd == '88888888')
        return {
            state: true,
            info: {
                name: '李晓红',
                from: '上海',
                sex: '女',
                nationality: '满',
                IDNumber: '333333333333333',
                studentNumber: '2017432109009',
                major: '信息与软件工程',
                school: '京城政法大学',
                graduationCertificateNo: '1928374650'
            }
        };
    return {
        state: false,
        info: {
            name: '',
            from: '',
            sex: '',
            nationality: '',
            IDNumber: '',
            studentNumber: '',
            major: '',
            school: '',
            graduationCertificateNo: ''
        }
    };
}
// 2018123401001 1234567890
// 2017432109009 88888888
function scCheck(stdId) {
    if (stdId == "2018123401001") return check(stdId, "1234567890");
    if (stdId == "2017432109009") return check(stdId, "88888888");
    return check("", "");
}
var flag = { cfNo: "", f: true };

function remokecf(cfNo, info, date) {
    console.log(cfNo, info, date);
    var th = cfContract.RemokeFunc.sendTransaction(info.schoolName, cfNo, web3.sha3(JSON.stringify(info)), date, { from: schoolPk, gas: 30000000 });
    return get(th)[0];
}

function addScPk(schoolName, schoolPk) {
    var th = cfContract.SchoolRegister.sendTransaction(schoolName, schoolPk, { from: admin, gas: 30000000 });
    return get(th)[0];
}

function extend(target, source) {
    for (var obj in source) {
        target[obj] = source[obj];
    }
    return target;
}

function getrandom() {
    return "random=" +
        Math.random().toString(36).substr(2);
}

function getCertificateNo(info) {
    var infoStr = JSON.stringify(info);
    // 访问区块链
    var th = cfContract.RegisterFunc.sendTransaction(info.schoolName, web3.sha3(infoStr), moment.valueOf(), { from: schoolPk, gas: 30000000 });
    var result = get(th);
    return {
        state: result[0],
        no: result[1],
        total: result[0] + ":" + result[1]
    };
}

app.get('/login', function(req, res) {
    console.log("getSchoolHtml");
    res.render("logIn.html", {
        logInSendDataUrl: url + port + '/studentCertificate?' + getrandom()
    });
})


// 2018123401001 1234567890
// 2017432109009 88888888
app.post('/studentCertificate', function(req, res) {
    console.log("postDataSchoolHtml");
    console.log(req.body);
    var schoolId = req.body.stuNumber;
    var pwd = req.body.password
    var result = check(schoolId, pwd)
    if (result.state == true) {
        var j = { state: 200, status: 200 };
        // console.log(getCertificateNo(result.info));
        res.json(200, extend({ data: result.info }, j));
    } else {
        res.json(200, { state: 201 });
    }
})

app.get('/studentConfimation', function(req, res) {
    console.log("postDataSchoolHtml");
    console.log(req.query);
    var schoolId = req.query.stuNumber;
    var pwd = req.query.password
    var result = check(schoolId, pwd)
    if (result.state == true) {
        var j = { state: 200, status: 200, studentConfirmationSendDataUrl: url + port + '/getCertificateNo?' + getrandom(), uid: "stuNumber=" + schoolId, p: "password=" + pwd, CertificateNo: '', studentConfirmationDownloadUrl: url + port + '/downloadCf?' + getrandom() };
        console.log(j.studentConfirmationSendDataUrl)
        console.log(extend(result.info, j));
        res.render("studentConfirmation", extend(result.info, j));
    } else {
        res.json(200, extend({ state: 201 }, result));
    }
})

app.post('/getCertificateNo', function(req, res) {
    console.log("getCertificateNo");
    console.log(req.query);
    var schoolId = req.query.stuNumber;
    var pwd = req.query.password
    var info = check(schoolId, pwd).info
    console.log(info);
    var result = getCertificateNo(info);
    console.log(result);
    if (result.state == "SUCCESS" || result.state == "PASS") {
        var j = { state: 200, status: 200 };
        res.json(200, extend(result, j));
    } else {
        var msg = " 发生错误 ";
        if (result.state == "REMOKE") msg = " 该证书被冻结 "
        var j = { state: 201, status: 201, message: msg };
        res.json(200, extend(result, j));
    }
})

app.get('/downloadCf', function(req, res) {
    console.log(req.query);
    var id = req.query.stuNumber;
    var pw = req.query.password;
    var info = check(id, pw).info;
    var no = getCertificateNo(info).no;
    var data = { ID: no, info: info };
    var path = "./data/" + id + ".cf";
    storeData(data, path);
    res.download(path, err => {
        if (err) {
            res.send("上传失败！");
        } else {
            console.log("上传成功！");
        }
    });
})

app.get('/remokeLogin', function(req, res) {
    res.render("schoolNumInput", {
        schoolNumInputSendDataUrl: "remokeLogin"
    });
})

app.post('/remokeLogin', function(req, res) {
    console.log(req.body);
    var stdId = req.body.stuNumber;
    var result = scCheck(stdId);
    if (result.state = true) {
        var cfNo = getCertificateNo(result.info);
        if (cfNo.state == "SUCCESS") {
            var j = { state: 200, status: 200 };
            res.json(200, extend(j, { data: result.info }))
        }
    }
    var j = { state: 201, status: 201 };
    res.json(200, extend(j))

})

app.get('/schoolRemoke', function(req, res) {
    console.log(req.query);
    var stdId = req.query.stuNumber;
    var result = scCheck(stdId);
    var cfNo = getCertificateNo(result.info);
    console.log(extend(result.info, {
        CertificateNo: cfNo.no,
        freezeDate: moment().add(1, 'years').format('YYYY-MM-DD'),
        schoolRemokeSendDataUrlUrl: "schoolRemoke?s=" + stdId
    }))
    res.render("schoolRemoke", extend(result.info, {
        CertificateNo: cfNo.no,
        freezeDate: moment().add(1, 'years').format('YYYY-MM-DD'),
        schoolRemokeSendDataUrlUrl: "schoolRemoke?s=" + stdId
    }));
})

app.post('/schoolRemoke', function(req, res) {
    console.log(req.query);
    var stdId = req.query.s;
    var result = scCheck(stdId);
    var cfNo = getCertificateNo(result.info);
    var rResult = remokecf(cfNo.no, result.info, moment().add(1, 'years').valueOf());
    if (rResult.state == true) {
        return res.json(200, { status: 200, state: 200, no: cfNo.no });
    }

    return res.json(200, { status: 201, state: 201 });
})

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
    // constract.deployWasmContract();
    // var result = constract.AddSchool("uestc", "asdfasdfasdfasdfasdfasdf");
    // console.log(result);
    cfContract = initialization();
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})