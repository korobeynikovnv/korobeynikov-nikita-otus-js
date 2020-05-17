const path = require('path');

module.exports = {
  entry: './App/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
	extensions: ['.js', 'css'],
	alias: {
		App: path.resolve(__dirname, 'App'),
	}
},
  watch: false
};