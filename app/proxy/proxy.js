'use strict';

var colors = require("colors");
var proxy = require("http-proxy-simple");
var fs = require("fs");
var config = require("../../config");
var fileNameIndex = 0;
var fileType = process.argv.slice(2, process.argv.length);

//var serverUrl = "http://" + config.ip + ':' + config.socket_port;
//var Client = require("socket.io-client");
//var socket = new Client(serverUrl);
var wsClient = require("./websocketClient");
var mock = require("./mock");

fileType = fileType.length ? fileType : [".html"];


//代理所使用的端口号
const PORT = config.proxy_port;
//本机ip
const IP = config.ip;


function proxyFileType(url) {
    for (var i = 0; i < fileType.length; i++) {
        if (url.indexOf(fileType[i]) != -1) {
            return true;
        }
    }
    return false;
}

function formateJSON(json) {
    return JSON.stringify(json, "", 4);//.replace("{","").replace("}","");
}


proxy = proxy.createProxyServer({
    host: IP,
    port: PORT
});


console.log("Print fileType ==>" + (fileType.join(" ").green))

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
    // console.log("proxy: " + cid + ": HTTP intercept request");
    console.log(("Proxy: "+ cid +' '+ request.url).green);
    console.log(request.connection.remoteAddress);
    var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.socket.remoteAddress || request.connection.socket.remoteAddress;
    if (mock.needMock(ip,request.url)){
        console.log('mock');
        mock.mockReq(ip,request.url,response);
    } else {
        performRequest(remoteRequest);
    }
});

proxy.on("http-intercept-response", function (cid, request, response, remoteResponse, remoteResponseBody, performResponse) {

    wsClient.emit(request, remoteResponse, remoteResponseBody);
    console.log('intercept-response '+cid);
    console.log(remoteResponseBody.toString());
    var body = new Buffer("hello word!");
    //if (proxyFileType(request.url)) {
    //    printXHR(request, remoteResponse, remoteResponseBody);
    //}
    performResponse(remoteResponse, remoteResponseBody);
});


//function reConnect(socket) {
//    console.log("reConnect WebSocket");
//    socket.disconnect();
//    return (new Client(serverUrl));
//}

//function emit(request, response, body) {
//    var dataSet = {
//        url: request.url,
//        status: response.statusCode,
//        method: request.method,
//        address: request.address,
//        req: request.headers,
//        res: response.headers,
//        body: body
//    };
//    try {
//
//        //console.log('emit proxy');
//        socket.emit("proxy", dataSet);
//    } catch (e) {
//        //socket = reConnect(socket);
//        socket.emit("err", {msg: "proxy server emit failed", err: e, url: request.url});
//        //console.log("resend :" + dataSet);
//        //socket.emit("proxy", dataSet);
//        console.log("proxy err: " + e);
//    }
//
//}

function printXHR(request, response, remoteResponseBody) {

    var fileName = ++fileNameIndex + ".md";
    var saveFileName = "./data/" + fileName;
    var fileInfo = "\nxhr ==> " + saveFileName;
    var general = "General: ==> \n" + formateJSON({
            "Request URL": request.url,
            "Request Method": request.method,
            "Status Code": response.statusCode,
            "Remote Address": request.address
        });

    var requestHeader = "Request headers: ==> \n" + formateJSON(request.headers);
    var responseHeader = "Response headers: ==> \n" + formateJSON(response.headers);

    var resBody = "Response body ==> \n\n" + (remoteResponseBody.toString());
    //console.log( [fileInfo, general,requestHeader,responseHeader].join("\n\n") )
    fs.writeFileSync(saveFileName, [general, requestHeader, responseHeader, resBody].join("\n\n"));

}




