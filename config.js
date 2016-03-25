var os = require('os');
var IPv4;

IPv4 = function () {
    if (os.platform() == 'darwin') {
        en0 = os.networkInterfaces().en0
    } else if (os.platform() == 'linux') {
        en0 = os.networkInterfaces().eth0
    }

    try {
        for (var i = 0; i < en0.length; i++) {
            if (en0[i].family == 'IPv4') {
                return en0[i].address;
            }
        }
    } catch (e) {
        return '127.0.0.1';
    }

}();


var exportConfig = {
    ip: IPv4,
    host: os.hostname(),
    proxy_port: 9000,
    socket_port: 9001,
    static_port: 9002,
    dbAddr: 'mongodb://localhost/proxy',
    socketServer: 'ws://112.124.118.39:9001'
};

module.exports = exportConfig

