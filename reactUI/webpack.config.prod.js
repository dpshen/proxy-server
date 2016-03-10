var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');

var entries = getEntry('reactUI/src/*.js', 'reactUI/src/');
var chunks = Object.keys(entries);

var config = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'javascript/[name].bundle.min.js',
    publicPath: ''
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    //new CommonsChunkPlugin({
    //    name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
    //    chunks: chunks,
    //    minChunks: chunks.length // 提取所有entry共同依赖的模块
    //}),
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }),
    new ExtractTextPlugin('styles/[name].css')
  ],
  module: {
    loaders: [
        {
            test: /\.jsx?$/,
            include: [path.join(__dirname, 'src')],
            loader: 'babel',
            query: {
            presets: ['react', 'es2015']
            }
        },
        { test: /\.less$/, loader: ExtractTextPlugin.extract('css!less') },
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
        { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ]
  }
};


var pages = Object.keys(getEntry('reactUI/src/view/**/*.html', 'reactUI/src/view/'));
pages.forEach(function(pathname) {
	var conf = {
		filename: pathname + '.html', //生成的html存放路径，相对于path
		template: 'reactUI/src/view/' + pathname + '.html', //html模板路径
		inject: false,	//js插入的位置，true/'head'/'body'/false
		minify: { //压缩HTML文件
			removeComments: true, //移除HTML中的注释
			collapseWhitespace: false //删除空白符与换行符
		}
	};
	if (pathname in config.entry) {
		conf.inject = true;
		conf.chunks = ['vendors', pathname];
		conf.hash = true;
	}
	config.plugins.push(new HtmlWebpackPlugin(conf));
});


module.exports = config;

function getEntry(globPath, pathDir) {
	var files = glob.sync(globPath);
	var entries = {},
		entry, dirname, basename, pathname, extname;

	for (var i = 0; i < files.length; i++) {
		entry = files[i];
		dirname = path.dirname(entry);
		extname = path.extname(entry);
		basename = path.basename(entry, extname);
		pathname = path.join(dirname, basename);
		pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
		entries[pathname] = './' + entry;
	}
	return entries;
}
