var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
require('babel-polyfill');
function resolve(dir) {
	return path.join(__dirname, '..', dir)
}
/****/
var webpack = require('webpack');

module.exports = {
	
	entry: {
		app: ['babel-polyfill', './src/main.js']
	},
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production' ?
			config.build.assetsPublicPath :
			config.dev.assetsPublicPath
	},
	externals: {
		'axios':'axios',
     	'jquery': '$',
  	},

	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
		}
	},
	/***引入jquery***/
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new webpack.ProvidePlugin({
			jQuery: "jquery",
			$: "jquery"
		})
	],
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
	
			{
				test: /\.js$/,
				loader: 'babel-loader?cacheDirectory=true',
				include: [resolve('src'), resolve('test'),resolve('node_modules/vue-particles')]

			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				query: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				query: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		]
	}
}