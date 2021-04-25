const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const DotEnv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: "./src/index.js", // Punto de entrada de nuestra app
    output: {
        // Se configura donde saldra el codigo generado
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js", // Es el nombre que tendra el archivo resultante como <bundle.js>
        assetModuleFilename: "assets/images/[hash][ext][query]",
    },
    resolve: {
        extensions: [".js"],
        alias: {
            "@utils": path.resolve(__dirname, "src", "utils"),
            "@templates": path.resolve(__dirname, "src", "templates"),
            "@styles": path.resolve(__dirname, "src", "styles"),
            "@images": path.resolve(__dirname, "src", "assets", "images"),
        },
    },
    module: {
        rules: [
            {
                test: /\.m?js$/, // Recibe una expresion regular
                exclude: /node_modules/, // Que carpetas no se van a anlizar
                use: {
                    loader: "babel-loader", // Que loader va a usar
                },
            },
            {
                test: /\.css$|.styl/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "stylus-loader",
                ],
            },
            {
                test: /\.png/,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false,
                    },
                },
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "assets/[name].[contenthash].css",
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images",
                },
            ],
        }),
        new DotEnv(),
        new CleanWebpackPlugin(),
    ],
    // Soporte de optimizacion para css y js
    optimization: {
        minimize: true,
        minimizer: [new CSSMinimizerPlugin(), new TerserPlugin()],
    },
};
