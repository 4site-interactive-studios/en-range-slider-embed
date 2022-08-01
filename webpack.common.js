const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devtool: "source-map",
  optimization: {
    usedExports: true,
  },
  output: {
    filename: "en-range-slider-embed.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            // disable type checker - we will use it in fork plugin
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "raw-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin({
      extensions: [".tsx", ".ts", ".js"],
      exclude: "node_modules",
    }),
  ],
};
