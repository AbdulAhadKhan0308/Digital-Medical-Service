const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/geo/storeFinder.js",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.webpack.json",
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    //first priortiy is
    //looking through current directory's src
    //second priority is
    //looking through node_modules
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules/leaflet/dist",
      "node_modules",
    ],
    //priority left to right
    extensions: [".ts", ".js", ".css"],
  },
  devtool: "cheap-module-source-map",
  //devtool: false,
  //watch: true,
};
