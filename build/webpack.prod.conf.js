const path = require("path");
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.conf");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtraPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const webpackConfig = merge(baseConfig, {
  mode: config.build.NODE_ENV,
  output: {
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash].js"),
    path: config.build.assetsRoot,
  },
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
              resolve("src"),
              resolve("node_modules/webpack-dev-server/client"),
            ],
          }),
        ],
      },
    ],
  },
  plugins: [
    //  https://webpack.docschina.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(config.build.NODE_ENV),
    }),
    //  https://github.com/jantimon/html-webpack-plugin#options
    new HtmlWebpackPlugin({
      template: "index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    //  https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtraPlugin({
      filename: utils.assetsPath("css/[name].[contenthash].css"),
      chunkFilename: utils.assetsPath("css/[id].[chunkhash].css"),
    }),
    new OptimizeCssAssetsWebpackPlugin({
      // 避免优化 z-index
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true },
    }),
    //  （模块路径做个hash）来生成模块的id
    new webpack.HashedModuleIdsPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    //  复制资源到构建目录
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../static"),
          to: config.build.assetsSubDirectory,
        },
      ],
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "../dll/manifest.json"),
    }),
    new AddAssetHtmlWebpackPlugin([
      {filepath: path.resolve(__dirname, "../dll/vue.js"),},
    ]),
  ],
  //  将node_modules中代码打包一个chunk， 自动分析多入口chunk公共依赖
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require("compression-webpack-plugin");
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp(
        "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
      ),
      threshold: 10240,
      minRatio: 0.8,
    })
  );
}
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled",
      //  生成 stats.json
      generateStatsFile: true,
    })
  );
}

module.exports = webpackConfig;
