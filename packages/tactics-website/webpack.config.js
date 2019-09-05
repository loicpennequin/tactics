const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = env => {
    const isProd = env.NODE_ENV === 'production';
    return {
        mode: env.NODE_ENV,
        target: 'web',
        devtool: 'inline-source-maps',
        entry: {
            home: path.resolve(__dirname, 'src/home.js'),
            signup: path.resolve(__dirname, 'src/home.js')
        },
        output: {
            path: path.resolve(__dirname, 'public'),
            publicPath: '/'
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'public'),
            historyApiFallback: true,
            hot: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            babelrc: true
                        }
                    }
                },
                {
                    test: /\.(sass|scss)$/,
                    use: [
                        !isProd && 'css-hot-loader',
                        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'sass-loader'
                    ].filter(loader => loader !== false)
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                __ENV__: '"' + env.NODE_ENV + '"'
            }),
            new CleanWebpackPlugin(),
            new WriteFilePlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        optimization: {
            minimizer: [
                isProd && new UglifyWebpackPlugin({ sourceMap: true }),
                isProd &&
                    new OptimizeCssAssetsPlugin({
                        cssProcessorOptions: { map: { inline: true } }
                    })
            ].filter(plugin => plugin !== false)
        }
    };
};
