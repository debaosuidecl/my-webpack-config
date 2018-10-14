
// no need for entry output production or development definition
// in webpack 4; but loaders for the mean time still have to depend on webpack.config.js
// install html-webpack-plugin and html-loader and require
// install mini-css-extract-plugin and css-loader
// install url-loader and img-loader and file-loader
/// install sass-loader node-sass and post-css for parsing sass document also need to create a postcss.config.js file inside _scss dir
// webpack compiles from bottom to top left to right

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = {
    module : {
        rules: [// an array of rules on how different file types are parsed
            // with different loaders
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, // rules usually have test: a regular expression, exclude to exclude unnecessary files from being transpiled by babel, and loaders.
                use: [//usually used to set an array of configurations each containing loader and or options(object)
                    {
                    loader: 'babel-loader'
                }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [//usually used to set an array of configurations each containing loader and options(object)
                    {
                        loader: "url-loader",
                        options: {
                            name: "./img/[name].[ext]",
                            limit: 10000 // the size of the document is in bytes, if exceeded transforms into a link to load the image to improve efficiency an stuff
                        }
                    },
                    {
                        loader: "img-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.html$/,
                use: [//usually used to set an array of configurations each containing loader and options(object)
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};








/*
const path = require('path');
const autoprefixer = require('autoprefixer');
module.exports={
    devtool: 'cheap-module-eval-source-map',

    module: {// module refers to what is used to set up general rules for all our different types of files
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [ // use shouldbe used when configuring multiple loaders for one test
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            importLoader: 1, // because we run one loader before css loader is called
                            modules: true,
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: ()=> autoprefixer({
                                        "browsers": [
                                            ">1%",
                                            "last 2 versions"
                                        ]})

                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/, // files ending with png jpg or jpeg and gif should be tested for
                loader: 'url-loader?limit=8000&name=images/[name].[ext]'
            }

        ]
    }
};*/
