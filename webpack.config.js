const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const cesiumSource = "node_modules/cesium/Build/Cesium";

module.exports = {
  context: __dirname,
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    sourcePrefix: "",
    clean: true,
  },
  resolve: {
    alias: {
      cesium: path.resolve(__dirname, cesiumSource),
    },
    fallback: {
      // force legacy modules off
      fs: false,
      path: false,
      zlib: false
    }
  },
  amd: {
    toUrlUndefined: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        include: /node_modules\/cesium/,
        type: "javascript/auto",
      }
    ],
    unknownContextCritical: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${cesiumSource}/Workers`, to: "cesium/Workers" },
        { from: `${cesiumSource}/Assets`, to: "cesium/Assets" },
        { from: `${cesiumSource}/Widgets`, to: "cesium/Widgets" },
        { from: `${cesiumSource}/ThirdParty`, to: "cesium/ThirdParty" },
      ],
    }),
  ],
  stats: {
    warningsFilter: [/Critical dependency:/],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    open: true,
    hot: true,
    watchFiles: ['src/**/*', 'index.html']
  },
  mode: "development",
  
};