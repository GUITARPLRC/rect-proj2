const path = require('path');

module.exports = {
	devtool: 'source-map',
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: 'style-loader!css-loader'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: 'file-loader?name=images/[name].[ext]'
			},
			{
				test: /\.(woff2?|svg)$/,
				loader: 'url-loader?limit=10000'
			},
			{
				test: /\.(ttf|eot)$/,
				loader: 'file-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	}
};
