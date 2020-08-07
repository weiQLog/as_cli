const { resolve } = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    vue: ["vue", "vue-router"],
    // elementUI: ['element-ui']
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "../dll"),
    library: "[name]_[hash]", // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: "[name]_[hash]", // 映射暴露的内容名称,
      path: resolve(__dirname, "../dll/manifest.json"), //输出文件路径
    }),
  ],
  mode: "production",
};
