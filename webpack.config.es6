// TODO output dir clean-up before build
// TODO CSS
// TODO ? devtool: 'source-map' ?
// TODO webpack-dev-server
// TODO "start"/"server" script
// TODO make it JS in ES% to make it compatible with other tools?
// TODO --optimize-minimize flag for webpack production build
// TODO transform-es2015-modules-commonjs

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry   : [
        './src/index.jsx'
    ],
    module  : {
        loaders : [
            {test : /\.jsx$/, exclude : /node_modules/, loader : 'babel-loader'}
        ]
    },
    output  : {
        filename : 'index.bundle.js',
        path     : __dirname + '/public'
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : __dirname + '/src/index.html',
            filename : 'index.html',
            inject   : 'body'
        }),
        new CopyWebpackPlugin([
            {from : 'src/images/', to : 'images/'},
            {from : 'src/css/', to : 'css/'}
        ])
    ]
};