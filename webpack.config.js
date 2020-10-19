const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;


console.log(`MODE: ${isProd ? 'PRODUCTION' : 'DEVELOPMENT'}`)

module.exports = {
    context: path.resolve(__dirname, 'dev'),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'dev'),
        }
    },
    devtool: isDev ? 'source-map' : false,
    entry: ['@babel/polyfill', './js/index.js'],
    output: {
        path: path.resolve(__dirname, 'src/template'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new CleanWebpackPlugin()
    ]
}
