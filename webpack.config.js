const BundleAnalyzerPlugin = require(`webpack-bundle-analyzer`).BundleAnalyzerPlugin
const ExtractTextPlugin = require(`extract-text-webpack-plugin`)
const HtmlWebpackPlugin = require(`html-webpack-plugin`)
const merge = require(`webpack-merge`)
const path = require(`path`)
const webpack = require(`webpack`)

const target = process.env.npm_lifecycle_event

const common = {
	entry: [path.join(process.cwd(), `src/index.jsx`)],
	output: {
		path: path.resolve(process.cwd(), `build/public`),
		publicPath: `/`
	},
	module: {
		rules: [
			{
				test: /\.js|x$/,
				exclude: /node_modules/,
				use: {loader: `babel-loader`}
			},
			{
				test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
				use: `file-loader`
			},
			{
				test: /\.(jpg|png|gif)$/,
				use: [
					`file-loader`,
					{
						loader: `image-webpack-loader`,
						options: {
							progressive: true,
							optimizationLevel: 7,
							interlaced: false,
							pngquant: {quality: `65-90`, speed: 4}
						}
					}
				]
			},
			{
				test: /\.html$/,
				use: `html-loader`
			},
			{
				test: /\.json$/,
				use: `json-loader`
			},
			{
				test: /\.(mp4|webm)$/,
				use: {
					loader: `url-loader`,
					options: {limit: 10000}
				}
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					loader: `css-loader`,
					options: {sourceMap: true}
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: `[name].css`,
			disable: false,
			allChunks: true
		}),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
		new webpack.NamedModulesPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: `vendor`,
			children: true,
			minChunks: 2,
			async: true
		})
	],
	resolve: {
		modules: [`src`, `node_modules`],
		extensions: [`.js`, `.jsx`],
		mainFields: [
			`browser`,
			`jsnext:main`,
			`main`
		],
		alias: {moment: `moment/moment.js`}
	},
	target: `web`
}
if (target === `build`) {
	const UglifyESPlugin = require(`uglifyjs-webpack-plugin`)
	module.exports = merge(common, {
		output: {
			filename: `[name].[chunkhash].js`,
			chunkFilename: `[name].[chunkhash].chunk.js`
		},
		plugins: [
			new BundleAnalyzerPlugin(),
			new webpack.DefinePlugin({'process.env': {NODE_ENV: `"production"`}}),
			new webpack.optimize.ModuleConcatenationPlugin(),
			new HtmlWebpackPlugin({
				inject: true,
				template: `src/index.html`,
				filename: `../index.html`,
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeStyleLinkTypeAttributes: true,
					keepClosingSlash: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true
				}
			}),
			new UglifyESPlugin()
		],
		performance: {assetFilter: (asset) => ! /(\.map$)|(^(main\.|favicon\.))/.test(asset)}
	})
}
if (target === `webpack:watch`) {
	const CircularDependencyPlugin = require(`circular-dependency-plugin`)
	module.exports = merge(common, {
		output: {
			filename: `[name].js`,
			chunkFilename: `[name].chunk.js`,
			crossOriginLoading: `anonymous`
		},
		plugins: [
			new webpack.DefinePlugin({'process.env': {NODE_ENV: `"development"`}}),
			new webpack.NoEmitOnErrorsPlugin(),
			new HtmlWebpackPlugin({
				inject: true,
				filename: `../index.html`,
				template: `src/index.html`
			}),
			new CircularDependencyPlugin({
				exclude: /a\.js|node_modules/,
				failOnError: false
			})
		],
		devtool: `cheap-module-source-map`,
		performance: {hints: false}
	})
}
