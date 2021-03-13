const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    web: './resource/entry.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        // use: [
        //   { loader: MiniCssExtractPlugin.loader },
        //   { loader: 'style-loader' },
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       modules: true
        //     }
        //   }
        // ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['web'],
      filename: 'index.html',
      template: path.resolve(__dirname, './resource/web.html'),
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
      chunkFilename: '[id].css',
    })
  ],
  devServer: {
    //顯示警告or錯誤訊息
    overlay: {
      warnings: true,
      errors: true
    },
    // writeToDisk:true,
    //每次bundle結束後自動開啟頁面
    open: true,
    //開啟的頁面名稱
    openPage: 'index.html',
    compress: true,
    //是否持續監聽指定目錄下所有檔案異動
    watchContentBase: true,
    //監聽指定目錄名稱
    contentBase: path.join(__dirname, './resource/'),
    //填入正確IP位置
    host: 'localhost',
    port: 3000
  }
};