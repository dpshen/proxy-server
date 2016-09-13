// var os = require('os');
// var IPv4;
//
// IPv4 = function () {
//     try {
//         if (os.platform() == 'darwin') {
//             en0 = os.networkInterfaces().en0
//         } else if (os.platform() == 'linux') {
//             en0 = os.networkInterfaces().eth1 || os.networkInterfaces().eth0
//         }
//
//         for (var i = 0; i < en0.length; i++) {
//             if (en0[i].family == 'IPv4') {
//                 return en0[i].address;
//             }
//         }
//     } catch (e) {
//         return '127.0.0.1';
//     }
//
// }();

var IPv4 = "127.0.0.1";

var proxy_port= 3101,
    socket_port= 3102,
    static_port= "3103";

var exportConfig = {
    ip: IPv4,
    proxy_port,
    socket_port,
    static_port,
    dbAddr: 'mongodb://localhost/proxy',
    socketServer: `ws://127.0.0.1:${socket_port}`
    //socketServer: 'ws://112.124.118.39:9001'
};

module.exports = exportConfig;

