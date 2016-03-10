var mongoose = require('mongoose');

var config = require('./app/config');
var dbAddr = config.dbAddr;

mongoose.connect(dbAddr);

//proxylist模型
var Schema = mongoose.Schema;
var proxySchema = new Schema({
    ip: String,
    recentTime: Date,
    mock: Boolean
});
exports.proxyListModel = mongoose.model('proxyList', proxySchema);

//mocklist模型
var mockSchema = new Schema({
    ip: String,
    url: String,
    switch: Boolean,
    public: Boolean,
    mockData: String
});
exports.mockListModel = mongoose.model('mockList', mockSchema);
