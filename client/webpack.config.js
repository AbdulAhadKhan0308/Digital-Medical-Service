const path = require("path");

const config = Object.assign(
  {},
  {
    mode: "development",
    entry: "./src/controller1.js",
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
      filename: "script1.js",
      path: path.resolve(__dirname, "..", "public"),
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
      extensions: [".ts", ".js"],
    },
    devtool: "cheap-module-source-map",
    //devtool: false,
    //watch: true,
  }
);

const patientConfig = Object.assign(
  {},
  {
    mode: "development",
    entry: "./src/patient/controller2.js",
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
      filename: "script2.js",
      path: path.resolve(__dirname, "..", "public", "patient"),
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
      extensions: [".ts", ".js"],
    },
    devtool: "cheap-module-source-map",
    //devtool: false,
    //watch: true,
  }
);

const doctorConfig = Object.assign(
  {},
  {
    mode: "development",
    entry: "./src/doctor/controller3.js",
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
      filename: "script3.js",
      path: path.resolve(__dirname, "..", "public", "doctor"),
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
      extensions: [".ts", ".js"],
    },
    devtool: "cheap-module-source-map",
    //devtool: false,
    watch: true,
  }
);

module.exports = [config, patientConfig, doctorConfig];
