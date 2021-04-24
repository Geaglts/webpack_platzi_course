const path = require("path");

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
};
