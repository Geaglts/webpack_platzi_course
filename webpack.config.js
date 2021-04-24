const path = require("path");

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: "./src/index.js", // Punto de entrada de nuestra app
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    resolve: {
        extensions: [".js"],
    },
};
