const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: "./src/index.js", // Punto de entrada de nuestra app
    output: {
        // Se configura donde saldra el codigo generado
        path: path.resolve(__dirname, "dist"),
        filename: "main.js", // Es el nombre que tendra el archivo resultante como <bundle.js>
    },
    resolve: {
        extensions: [".js"],
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
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin(),
    ],
};
