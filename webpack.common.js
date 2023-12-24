const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: {
    main: {
      import: "./src/index.js",
      dependOn: "shared",
    },
    vendor: {
      import: "./src/vendor.js",
      dependOn: "shared",
    },
    shared: ["bootstrap", "jquery", "slick-carousel"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        chunks: "all",
        vendor: {
          chunks: "initial",
          name: "vendor",
          test: "vendor",
          enforce: true,
        },
        slickVendor: {
          test: /[\\/]node_modules[\\/]slick-carousel[\\/]/,
          name: "slickVendor",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /style/,
        use: ["to-string-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf)/,
        loader: "file-loader",
        options: {
          outputPath: "fonts",
        },
      },
      {
        test: /\.scss$/,
        include: /style/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [require("autoprefixer")],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        include: path.resolve(__dirname, "src", "asset", "resource"),
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images",
              publicPath: "images",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx"],
      failOnError: true,
      emitWarning: true,
      overrideConfigFile: path.resolve(__dirname, ".eslintrc"),
    }),
  ],
};
