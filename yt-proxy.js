require('./app/socket');

var config = require("./config");
var http = require('http');
var express = require('express');
var app = express();
app.use("/", express.static(__dirname + '/webUI'));

// 创建服务端
http.createServer(app).listen(config.static_port, function () {
    console.log('webUI服务   ' + (config.ip + ':' + config.static_port).green);
});

exports = require('./app/proxy');
