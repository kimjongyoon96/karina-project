const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv").config();
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/, // .ts, .tsx, .js, .jsx 파일을 대상으로 합니다.
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            // @babel/preset-typescript를 추가합니다.
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"], // .tsx와 .jsx 확장자를 처리합니다.
  },
  devtool: "source-map",
  plugins: [
    new ESLintPlugin({
      fix: true,
      extensions: ["ts", "js"],
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed),
    }),
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, "src", "public", "index.html"), // 템플릿 파일 위치
    //   filename: "index.html", // dist 폴더 내에서 생성될 파일 이름
    // }),
  ],
  performance: {
    hints: false,
  },
  output: {
    publicPath: "/",
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "src", "public"),
    },
    compress: true,
    port: 3001,
    devMiddleware: {
      publicPath: "/",
    },
  },
};
