var express = require('express');
var ejs = require('ejs');
var path = require("path");
var bodyParser = require('body-parser');
const { encrypt, decrypt } = require('./crypto');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// var constract = require("./adminContract");


app.use('/html', express.static('html'));
app.use(express.static(path.join(__dirname, '/html')));
// app.use('/css', express.static('/html/css'));
// app.use('/images', express.static('/html/images'));
// app.use('/js', express.static('/html/js'));



app.set('views', path.join(__dirname, './html'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');



function check(stdId, pwd) {
    if (stdId == '2018123401001' && pwd == '1234567890')
        return {
            state: true,
            info: {
                name: '王小明',
                from: '北京',
                sex: '男',
                nationality: '汉',
                IDNumber: '44444444444444444',
                studentNumber: '2018123401001',
                major: '计算机系统与技术',
                school: '华夏人民大学',
                graduationCertificateNo: '1145141919',
                CertificateNo: ''
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
                IDNumber: '33333333333333333',
                studentNumber: '2017432109009',
                major: '信息与软件工程',
                school: '京城政法大学',
                graduationCertificateNo: '1928374650',
                CertificateNo: ''
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

function getCertificateNo(info) {
    var infoStr = JSON.stringify(info);
    // 访问区块链
    var result = "SUCCESS:123456"
    var split = result.split(":")
    return {
        state: split[0],
        no: split[1]
    };
}


app.get('/test1', function(req, res) {
    console.log("get!");
    res.send('Hello World!!!');
})

app.get('/login', function(req, res) {
    console.log("getAdminHtml");
    res.render("logIn.html", {
        logInSendDataUrl: 'http://127.0.0.1:8081/studentCertificate'
    });
})
app.get('/studentCertificate', function(req, res) {
    console.log("postDataAdminHtml");
    console.log(req.query);
    var schoolId = req.query.stuNumber;
    var pwd = req.query.password
    var result = check(schoolId, pwd)
    if (result.state == true) {
        console.log(getCertificateNo(result.info));
        res.render("studentConfirmation", result.info);
    } else {
        res.json(200, { state: 201 })
    }
})

app.get('/domloadCertificate', function(req, res) {

})

var server = app.listen(8081, function() {
    // constract.deployWasmContract();
    // var result = constract.AddSchool("uestc", "asdfasdfasdfasdfasdfasdf");
    // console.log(result);
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})