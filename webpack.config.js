const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        // compress: true,
        // port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin ({
            filename: 'index.html', // destination, it's not saved on the disk
            template: './src/index.html'  // src, what if have multiple pages?
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,  // look at all of the files end with .js
                exclude: /node_modules/, // need to exclude all files in the node_modules dir
                use: {
                    loader: 'babel-loader'  // specify the loader

                }
            }
        ],
    }
}