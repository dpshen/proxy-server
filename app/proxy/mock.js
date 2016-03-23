var proxyListModel = require("../../model").proxyListModel;
var mockListModel = require("../../model").mockListModel;


function upsert(model) {
    var args = Array.prototype.slice.call(arguments, 1);
    var query = {}, update = {};
    if (args[0]) {
        query = args[0];
    }
    if (args[1]) {
        update = args[1];
    }
    //console.log((model.modelName).blue, '==> query: ', query, '\nupdate: ', update);
    model.update(query, {$set: update}, {upsert: true, multi: true}, function (err, result) {
        if (!err) {
            console.log('upsert:'.green, result);
            return result;
        } else {
            console.log(err);
            return false;
        }
    });
}


// 判断请求是否需要mock
exports.needMock = function (ip, url, callback) {
    //console.log(ip, url);
    var query = {ip: ip};
    var filter = {ip: 1, mock: 1, _id: 0};
    proxyListModel.findOne(query, filter, function (err, result) {
        if (!err) {
            //console.log('fetchMockProxy:'.blue, result);
            if (result) {
                callback(result.mock);
            } else {
                upsert(proxyListModel, {ip: ip}, {ip: ip, recentTime: new Date(), mock: false});
                callback(false);
            }
        } else {
            console.log(err);
            callback(false);
        }
    });
};

// mock
exports.mockReq = function (ip, url, response, remoteRequest, performRequest) {

    url = url.split('?')[0];
    //console.log("mock ==>".red, (ip).red, (url).red);
    // mock私有数据
    var privateQuery = {ip: ip, url: url, switch: true, public: false};
    var filter = {_id: 0, mockData: 1};
    mockListModel.findOne(privateQuery, filter, function (err, result) {
        if (!err) {
            //console.log('fetchPrivateMockData:'.blue, privateQuery, "\nMockData:".green, result);
            if (result) {
                response.setHeader("mockPrivate", "true");
                response.end(result.mockData);
                return true;
            } else {
                //console.log("no private mock data!".yellow);
                // mock公共数据
                mockPublic(ip, url, response, remoteRequest, performRequest);
            }

        } else {
            console.log(err);
            performRequest(remoteRequest);
        }
    });

};

// mock公共数据
function mockPublic(ip, url, response, remoteRequest, performRequest) {
    var publicQuery = {ip: null, url: url, switch: true, public: true};
    var filter = {_id: 0, mockData: 1};
    mockListModel.findOne(publicQuery, filter, function (err, result) {
        if (!err) {
            //console.log('fetchPublicMockData:'.blue, publicQuery, "\nMockData:".green, result);
            if (result) {
                response.setHeader("mockPublic", "true");
                response.end(result.mockData);
                return true;
            } else {
                //console.log("no public mock data!".yellow);
                performRequest(remoteRequest);
            }

        } else {
            console.log(err);
            performRequest(remoteRequest);
        }
    });
}
