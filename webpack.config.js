const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/reader.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'm3u8-file-parser.min.js',
    library: ['M3U8FileParser'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
