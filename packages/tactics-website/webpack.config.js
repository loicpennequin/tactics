const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    const isProd = !env.__DEV__;
    return {
        mode: env.__DEV__ ? 'development' : 'production',
        devtool: 'inline-source-maps',
        entry: {
            home: path.resolve(__dirname, 'src/home.js'),
            signup: path.resolve(__dirname, 'src/signup.js')
        },
        output: {
            path: path.resolve(__dirname, 'public'),
            publicPath: '/'
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'public'),
            hot: true,
            writeToDisk: true,
            stats: 'minimal',
            historyApiFallback: {
                rewrites: [
                    { from: /^\/$/, to: '/home.html' },
                    { from: /^\/signup/, to: '/signup.html' }
                ]
            }
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
                __PORT__: '"' + env.__PORT__ + '"'
            }),
            new CleanWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/views/home.html'),
                filename: 'home.html',
                inject: 'body',
                chunks: ['home']
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/views/signup.html'),
                filename: 'signup.html',
                inject: 'body',
                chunks: ['signup']
            })
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
