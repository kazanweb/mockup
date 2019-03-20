const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globImporter = require('node-sass-glob-importer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const devMode = process.env.NODE_ENV !== 'production';
const fs = require('fs');

const pugFiles = [
	'404',
	'search-result',
	'search-result2',
	'main',
	'news',
	'search-result-news',
	'search-result-reviews',
	'favorites-product',
	'favorites-news',
	'service-center',
	'brand-reviews',
	'catalog-reviews',
	'product-reviews',
	'service-center-by-brand',
	'return',
	'collaboration',
	'usloviya',
	'service-center',
	'delivery',
	'installation',
	'catalog-list',
	'catalog-list-without-slider',
	'catalog-thumb',
	'news-sale',
	'botique-feedback',
	'news-article',
	'brand',
	'about-hausdorf',
	'confirm',
	'adress-butika',
	'partners',
	'basket',
	'compare',
	'detail',
	'detail-with-complect'
];

const entryHtmlPlugins = pugFiles.map(function (entryName) {
	return new HtmlWebpackPlugin({
		filename: entryName + '.html',
		template: __dirname + `/src/pages/${entryName}.pug`
	});
});

module.exports = {
	entry: [
		'./src/js/index.js',
		'./src/styles/style.scss'
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].bundle.js',
		chunkFilename: 'js/[name].bundle.js',
		// publicPath: '/dist/'
	},
	devServer: {
		// contentBase: path.join(__dirname, '/templates/default/build/'),
		overlay: true
	},
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader'
				}]
			},
			{
				test: /\.pug$/,
				exclude: /node_modules/,
				loader: 'pug-loader',
				options: {
					pretty: true,
					root: path.resolve(__dirname, 'src/components')
				}
			},
			// {
			// 	test: /\.css$/,
			// 	use: ['style-loader', 'css-loader']
			// },
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							config: {
								path: './postcss.config.js'
							}
						}
					},
					{
						loader: 'sass-loader',
						options: {
							importer: globImporter()
						}
					}
				]
			},
			{
				test: /\.(jpg|png|svg|gif)$/,
				use: [{
					loader: 'base64-inline-loader',
					options: {
						outputPath: 'images/',
						publicPath: '../images/',
						name: '[name].[ext]',
						limit: 8192
					}
				}]
			},
			{
				test: /\.(eot|ttf|woff|woff2|otf)$/,
				use: [{
					loader: 'file-loader',
					options: {
						outputPath: 'css/fonts/',
						publicPath: 'fonts/',
						name: '[name].[ext]'
					}
				}]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/pages/index.pug'
		}),
		new HtmlBeautifyPlugin({
			config: {
				html: {
					end_with_newline: true,
					indent_size: 1,
					indent_with_tabs: true,
					indent_inner_html: true,
					preserve_newlines: true,
					indent_char: true,
					brace_style: 'expand',
					space_before_conditional: true,
					unformatted: ['sub', 'sup', 'b', 'u', 'span', 'br']
				}
			},
			replace: [' type="text/javascript"']
		}),
		new CopyWebpackPlugin([{
			from: './src/images/',
			to: 'images/'
		}]),
		new ImageminPlugin({
			disable: process.env.NODE_ENV !== 'production',
			test: /\.(jpe?g|png|gif|svg)$/i,
			pngquant: {
				quality: '60'
			},
			optipng: {
				optimizationLevel: 9
			}
		}),
		new MiniCssExtractPlugin({
			filename: 'css/style.css'
		}),
		new webpack.HotModuleReplacementPlugin()
	].concat(entryHtmlPlugins),
	devtool: 'source-map'
};