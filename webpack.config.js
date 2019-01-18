const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib'),
        publicPath: '/lib/',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'awesome-typescript-loader'
                }
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: {
                    loader: "source-map-loader"
                }
            }
        ]
    },
};