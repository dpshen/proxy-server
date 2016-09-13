require("babel-register");
require("babel-polyfill");

require('./app/proxy/socket');
require('./app/proxy/proxy');

var config = require("./config");
// var http = require('http');
var express = require('express');

var port = config.static_port;
var hosts = "127.0.0.1";

if (process.argv.length > 2 && process.argv[2] == 'dev'){
    process.env.NODE_ENV = "dev";

    var webpack = require("webpack")
    var WebpackDevServer = require("webpack-dev-server")

    var webpackConfig = require("./webpack.config.js");

// var hosts = "192.168.31.187";
    var devport = 8081

    Object.keys(webpackConfig.entry).map(function(item){
        webpackConfig.entry[item].unshift(`webpack-dev-server/client?http://${hosts}:${port}/`,"webpack/hot/dev-server")
    })

    var compiler = webpack(webpackConfig);

    var server = new WebpackDevServer(compiler, {
        //热加载
        hot:true,
        //热加载必须的 inline
        inline:true,

        quiet: false,
        compress: false,
        historyApiFallback: true,
        stats: {
            // Config for minimal console.log mess.
            assets: true,
            colors: true,
            version: false,
            hash: true,
            timings: true,
            chunks: false,
            chunkModules: true
        }
    });

    server.listen(port);
    console.log(`Open http://fbi.yuantutech.com:${port}`)

} else {
    var app = express();

    console.log(config.static_port)
    app.listen(config.static_port);
    app.use(function (req, res, next) {
        console.log('Time:', Date.now(), 'Request URL:', req.originalUrl);
        next();
    })
    app.use("/", express.static('build', {fallthrough:true}));
    console.log(`Open http://fbi.yuantutech.com:${port}`)

}


