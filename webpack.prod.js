const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, '../02_deployment/dist'),
		filename: 'main.[contenthash].js',
		clean: true,
		assetModuleFilename: '[file]',
	},
	module: {
		rules: [
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: './src/styles/[name].[contenthash].css',
		}),
	],
});
