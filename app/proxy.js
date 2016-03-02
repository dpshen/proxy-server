'use strict'

let colors = require("colors");
let proxy = require("http-proxy-simple");
let fs = require("fs");
let config = require("../config");
let fileNameIndex = 0;
let fileType = process.argv.slice(2, process.argv.length);

let serverUrl = "http://" + config.ip + ':' + config.socket_port
let Client = require("socket.io-client");
let socket = new Client(serverUrl);

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
    console.log(("Proxy: " + request.url).green);
    performRequest(remoteRequest);
});

proxy.on("http-intercept-response", function (cid, request, response, remoteResponse, remoteResponseBody, performResponse) {

    emit(request, remoteResponse, remoteResponseBody);
    if (proxyFileType(request.url)) {
        printXHR(request, remoteResponse, remoteResponseBody);
    }
    performResponse(remoteResponse, remoteResponseBody);
});


function reConnect(socket) {
    console.log("reConnect WebSocket");
    socket.disconnect();
    return (new Client(serverUrl));
}
function emit(request, response, body) {
    var dataSet = {
        url: request.url,
        status: response.statusCode,
        method: request.method,
        address: request.address,
        req: request.headers,
        res: response.headers,
        body: body
    };
    try {
        //console.log('emit proxy');
        socket.emit("proxy", dataSet);
    } catch (e) {
        socket = reConnect(socket);
        console.log("resend :" + dataSet);
        socket.emit("proxy", dataSet);
        socket.emit("err", {msg: "proxy server emit failed", err: e});
        console.log("proxy err: " + e);
    }

}

function printXHR(request, response, remoteResponseBody) {

    let fileName = ++fileNameIndex + ".md";
    let saveFileName = "./data/" + fileName;
    let fileInfo = "\nxhr ==> " + saveFileName;
    let general = "General: ==> \n" + formateJSON({
            "Request URL": request.url,
            "Request Method": request.method,
            "Status Code": response.statusCode,
            "Remote Address": request.address
        });

    let requestHeader = "Request headers: ==> \n" + formateJSON(request.headers);
    let responseHeader = "Response headers: ==> \n" + formateJSON(response.headers);

    let resBody = "Response body ==> \n\n" + (remoteResponseBody.toString());
    //console.log( [fileInfo, general,requestHeader,responseHeader].join("\n\n") )
    fs.writeFileSync(saveFileName, [general, requestHeader, responseHeader, resBody].join("\n\n"));

}




