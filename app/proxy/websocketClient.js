var config = require("../config");
var serverUrl = "ws://" + config.ip + ':' + config.socket_port;
var WebSocket = require('ws');
//var Client = require("socket.io-client");
//var socket = new Client(serverUrl);
var ws = new WebSocket(serverUrl);

ws.on('open', function open() {
    console.log('connect');
});

var mock = require('./mock');


//function reConnect(ws) {
//    console.log("reConnect WebSocket");
//    ws.disconnect();
//    return (new Client(serverUrl));
//}

function getBodyStr(body) {
    if (body.type != 'Buffer'){
        console.log('not buffer',body.type);
        return body.data
    } else {
        var data = body.data;
        if ( data.isEncoding('utg-8') ) {
            data = data.toString()
        } else if (data.isEncoding('ascii')){
            data = data.toString('ascii')
        } else if (data.isEncoding('gbk')){
            data = data.toString('gbk')
        }
        return data
    }
}

/*
向webSocket服务端发送截获的http请求数据
 */
module.exports.emit = function(request, response, body, cid) {

    //body = getBodyStr(body);

    var dataSet = {
        url: request.url,
        status: response.statusCode,
        method: request.method,
        address: cid.substring(0, cid.indexOf(':')),
        req: request.headers,
        res: response.headers,
        body: body
    };
    try {
        //socket.emit("proxy", dataSet);
        ws.send(JSON.stringify(dataSet))

    } catch (e) {
        console.log("proxy err: " + e);
    }

};

//module.exports = emit;
