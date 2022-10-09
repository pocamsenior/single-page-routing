/*
[] install dev dependencies
npm i webpack webpack-cli webpack-dev-server webpack-merge css-loader style-loader html-loader html-webpack-plugin mini-css-extract-plugin vitest @vitest/ui -D

[] install dependencies
npm i @babel/core @babel/preset-env babel-loader
npm i current-device

[] add scripts
"test": "vitest --run --reporter verbose",
"test:watch": "vitest",
"test:ui": "vitest --ui",
"dev": "npx webpack serve --config webpack.dev.js",
"dev:m": "cd ~ && ./ngrok http 3000",
"build": "webpack --config webpack.prod.js"
"deploy:first": "git push origin `git subtree split --prefix 02_deployment/dist deploy`:deploy --force",
"deploy": "git subtree push --prefix 02_deployment/dist origin deploy"

vitest ui
http://localhost:51204/__vitest__/
https://vitest.dev/guide/filtering.html
*/

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: ['./src/main.js'],
	module: {
		rules: [
			{ test: /\.html$/, use: 'html-loader' },
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: { localIdentName: '[name]_[local]' },
						},
					},
				],
				include: /\.module\.css$/,
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
				exclude: /\.module\.css$/,
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: '[file]',
				},
			},
			{
				test: /\.(svg|jpg|png)$/i,
				type: 'asset/resource',
				generator: {
					filename: '[file]',
				},
			},
			{
				test: /\.pdf$/i,
				type: 'asset/resource',
				generator: {
					filename: '[file]',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
	],
};
