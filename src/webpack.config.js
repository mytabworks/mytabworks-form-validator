var path = require('path');

module.exports = {
    mode: 'production',
    entry: './Components/index.js',
    externals : {
        react: 'react'
    },
    output: {
        path: path.resolve('lib'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.css?$/, 
                use: ["style-loader", "css-loader"]
            }
        ]
    }
}