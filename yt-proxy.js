require('./app/server/socket');
require('./app/proxy/proxy');

var config = require("./config");
var http = require('http');
var express = require('express');
var app = express();


if (process.argv[2] != 'dev') {
    app.use("/", express.static(__dirname + '/reactUI/build'));

    /* 创建UI静态服务器 */
    http.createServer(app).listen(config.static_port, function (err) {
        if (err) {
            console.log(err);
            return false;
        }
    });
    console.log("product===>".green)
} else {
    /* 开发环境使用express做UI服务 */
    var path = require('path');
    var webpack = require('webpack');
    var devConfig = require('./reactUI/webpack.config.dev');

    //var routes = require('./reactUI/routes/index');

    var compiler = webpack(devConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: devConfig.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));

    app.use('/', function(req, res, next) {
        res.sendFile(path.join(__dirname, 'reactUI/dev/index.html'));
    });

    app.listen(config.static_port, config.ip, function (err) {
        if (err) {
            console.log(err);
            return false;
        }
        console.log("dev====>".green)
    })
}
console.log('webUI服务   ' + (config.ip + ':' + config.static_port).green);
