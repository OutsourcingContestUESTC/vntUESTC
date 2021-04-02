var express = require('express');
var ejs = require('ejs');
var path = require("path");
var bodyParser = require('body-parser');
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


app.get('/test1', function(req, res) {
    console.log("get!");
    res.send('Hello World!!!');
})

app.get('/admin', function(req, res) {
    console.log("getAdminHtml");
    res.render("adminAdd.html", {
        sendDataUrl: 'http://127.0.0.1:8082/admin',
        result: ''
    });
})
app.post('/admin', function(req, res) {
    console.log("postDataAdminHtml");
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=UTF8'
    });
    var response = {
        "schoolName": req.query.schoolName,
        "schoolPk": req.query.publicKey
    };
    console.log(req.body);
    // console.log(req);
    // var result = constract.AddSchool("uestc", "asdfasdfasdfasdfasdfasdf");
    // console.log(result);
    // res.render("adminAdd", {
    //     sendDataUrl: 'http://127.0.0.1:8082'
    // });
    // res.render("dyAdminAdd.html", {
    //     sendDataUrl: 'http://127.0.0.1:8082/admin',
    //     result: 'SUCCESS!'
    // });
})

var server = app.listen(8082, function() {
    // constract.deployWasmContract();
    // var result = constract.AddSchool("uestc", "asdfasdfasdfasdfasdfasdf");
    // console.log(result);
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})