var express = require('express');
var ejs = require('ejs');
var path = require("path");
var path_ = path;
var bodyParser = require('body-parser');
const fs = require('fs');
// 引入multer中间件，用于处理上传的文件数据
const multer = require('multer');
const { encrypt, decrypt } = require('./crypto');
const { connect } = require('http2');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// var constract = require("./adminContract");


app.use('/html', express.static('html'));
app.use(express.static(path.join(__dirname, '/html')));
// app.use('/css', express.static('/html/css'));
// app.use('/images', express.static('/html/images'));
// app.use('/js', express.static('/html/js'));

var url = 'http://127.0.0.1:';
var port = 8083;

app.set('views', path.join(__dirname, './html'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
// 通过配置multer的dest属性， 将文件储存在项目下的tmp文件中
app.use(multer({ dest: './tmp/' }).any())

const loadData = (path) => {
    try {
        return fs.readFileSync(path, 'utf8')
    } catch (err) {
        console.error(err)
        return false
    }
}

function cfVerification(info) {
    return true;
}

app.get('/test1', function(req, res) {
    console.log("get!");
    res.send('Hello World!!!');
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
            filePath = '.\\' + filePath;
            console.log(filePath);
            var data = loadData("./" + filePath);
            console.log(data);
            var j = JSON.parse(data);
            console.log(j);
            console.log(j.info.studentNumber)
            if (cfVerification(j))
                res.json(200, { status: 200 });
            else res.json(200, { status: 201 });
        }
    })
})
var server = app.listen(port, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})