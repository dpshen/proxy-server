var config = require("../../config");
var serverUrl = "http://" + config.ip + ':' + config.socket_port;
var Client = require("socket.io-client");
var socket = new Client(serverUrl);

var mock = require('./mock');


function reConnect(socket) {
    console.log("reConnect WebSocket");
    socket.disconnect();
    return (new Client(serverUrl));
}

/*
向webSocket服务端发送截获的http请求数据
 */
module.exports.emit = function(request, response, body) {
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
        socket.emit("proxy", dataSet);
    } catch (e) {
        //socket = reConnect(socket);
        socket.emit("err", {msg: "proxy server emit failed", err: e, url: request.url});
        console.log("proxy err: " + e);
    }

};

//module.exports = emit;
