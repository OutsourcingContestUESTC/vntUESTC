var express = require('express');
var ejs = require('ejs');
var path = require("path")
var app = express();

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
        sendDataUrl: 'http://127.0.0.1:8082/admin'
    });
})
app.post('/admin', function(req, res) {
    console.log("postDataAdminHtml");
    console.log(req.query)
        // res.render("adminAdd", {
        //     sendDataUrl: 'http://127.0.0.1:8082'
        // });
})

var server = app.listen(8082, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})