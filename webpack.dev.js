const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'dev.js',
		clean: true,
		assetModuleFilename: '[file]',
	},
	devtool: 'source-map',
	devServer: {
		static: [
			{
				directory: path.resolve(__dirname, 'dist'),
			},
		],
		open: true,
		hot: true,
		watchFiles: ['index.html'],
		compress: true,
		historyApiFallback: true,
		port: 3000,
		devMiddleware: {
			mimeTypes: {
				html: 'text/html',
				css: 'text/css',
				js: 'text/javascript',
				svg: 'image/svg+xml',
			},
		},
		allowedHosts: 'all',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin(),
	],
	experiments: { topLevelAwait: true },
});
