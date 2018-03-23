const config = require('./webpack.config.js');
const webpack = require('webpack');

const compiler = webpack(config);
compiler.run();
