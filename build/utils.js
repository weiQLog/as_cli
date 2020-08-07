const path = require("path");
const config = require("../config");
const postcssPresetEnv = require("postcss-preset-env");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = process.env.NODE_ENV === "production";

exports.cssLoaders = function(options) {
  options = options || {};

  const cssLoader = {
    loader: "css-loader",
    options: {
      sourceMap: options.sourceMap,
    },
  };

  const miniCssExtraPluginLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: options.publicPath,
    },
  };

  const postcssLoader = {
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      plugins: () => [postcssPresetEnv()],
      sourceMap: options.sourceMap,
    },
  };

  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS
      ? [
          isProduction ? miniCssExtraPluginLoader : "style-loader",
          cssLoader,
          postcssLoader,
        ]
      : [
          isProduction ? miniCssExtraPluginLoader : "style-loader",
          cssLoader,
        ];

    if (loader) {
      loaders.push({
        loader: loader + "-loader",
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        }),
      });
    }
    return loaders;
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders("less"),
    sass: generateLoaders("sass", { indentedSyntax: true }),
    scss: generateLoaders("sass"),
    stylus: generateLoaders("stylus"),
    styl: generateLoaders("stylus"),
  };
};

exports.styleLoaders = function(options) {
  const output = [];
  const loaders = exports.cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp("\\." + extension + "$"),
      use: loader,
    });
  }
  return output;
};

exports.jsLoaders = function(options) {
  options = options || {};

  const threadLoader = {
    loader: "thread-loader",
    options: {
      workers: config.build.threadLoaderWorkers,
    },
  };

  const babelLoader = {
    loader: "babel-loader",
    options: {
      presets: [
        [
          "@babel/preset-env",
          {
            useBuiltIns: "usage",
            corejs: options.corejs,
            targets: options.targets,
          },
        ],
      ],
      cacheDirectory: true,
    },
  };

  return {
    test: new RegExp("\\.js$"),
    include: options.include,
    use: [options.useThreadLoader ? threadLoader : {}, babelLoader],
  };
};

exports.assetsPath = function(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === "production"
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};
