'use strict';

var colors = require("colors");
var proxy = require("http-proxy-simple");
var config = require("../../config");

var ws = require("./socket");
var mock = require("./mock");

//代理所使用的端口号
var PORT = config.proxy_port;
//本机ip
var IP = config.ip;

proxy = proxy.createProxyServer({
    host: IP,
    port: PORT
});


//console.log("Print fileType ==>" + (fileType.join(" ").green))

console.log("Please set the proxy ==> " + (IP + ":" + PORT).green);

proxy.on("connection-open", function (cid, socket) {
    // console.log("proxy: " + cid + ": TCP connection open");
});

proxy.on("connection-error", function (cid, socket, error) {
    // console.log("proxy: " + cid + ": TCP connection error: " + error);
});

proxy.on("connection-close", function (cid, socket, had_error) {
    // console.log("proxy: " + cid + ": TCP connection close");
});

proxy.on("http-ggv", function (cid, request, response) {
    // console.log("proxy: " + cid + ": HTTP request: " + request.url);
});

proxy.on("http-error", function (cid, error, request, response) {
    // console.log("proxy: " + cid + ": HTTP error: " + error + request.url);
});

proxy.on("http-intercept-request", function (cid, request, response, remoteRequest, performRequest) {
    // console.log(("Proxy: "+ cid +' '+ request.url).green);
    var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.socket.remoteAddress || request.connection.socket.remoteAddress;
    mock.needMock(ip,request.url,function (flag){
        if(flag){
            mock.mockReq(ip,request.url,response,remoteRequest,performRequest);
        } else {
            performRequest(remoteRequest);
        }
    });
});

proxy.on("http-intercept-response", function (cid, request, response, remoteResponse, remoteResponseBody, performResponse) {

    var dataSet = {
        url: request.url,
        status: remoteResponse.statusCode,
        method: request.method,
        address: cid.substring(0, cid.indexOf(':')),
        req: request.headers,
        res: remoteResponse.headers,
        body: remoteResponseBody
    };

    ws.broadcast(JSON.stringify(dataSet));

    performResponse(remoteResponse, remoteResponseBody);
});

