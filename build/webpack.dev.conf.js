const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const { merge } = require("webpack-merge");
const path = require("path");
const baseWebpackConfig = require("./webpack.base.conf");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtraPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const portfinder = require("portfinder");

const HOST = config.dev.host;
const PORT = config.dev.port;
process.env.NODE_ENV = config.dev.NODE_ENV;

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        oneOf: [
          ...utils.styleLoaders({
            publicPath: "../",
            sourceMap: config.build.productionSourceMap,
            usePostCSS: true,
          }),
          utils.jsLoaders({
            useThreadLoader: config.build.useThreadLoader,
            include: [
              path.resolve("src"),
              path.resolve("node_modules/webpack-dev-server/client"),
            ],
          }),
        ],
      },
    ],
  },
  // 使用cheap-module-eval-source-map 在开发模式中最快
  devtool: config.dev.devtool,

  //  https://webpack.js.org/configuration/dev-server/
  devServer: {
    clientLogLevel: "warning",
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, "index.html"),
        },
      ],
    },
    hot: true,
    contentBase: false,
    compress: true,
    host: HOST,
    port: PORT,
    disableHostCheck: true,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // FriendlyErrorsPlugin 所需
    watchOptions: {
      poll: config.dev.poll,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR 确保在控制台显示正确的文件名
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../static"),
          to: config.dev.assetsSubDirectory,
        },
      ],
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(config.dev.NODE_ENV),
    }),
  ],
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      process.env.PORT = port;
      devWebpackConfig.devServer.port = port;
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `running http://${devWebpackConfig.devServer.host}:${port}`,
            ],
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined,
        })
      );
      resolve(devWebpackConfig);
    }
  });
});
