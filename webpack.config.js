const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const PAGES_DIR = './src/pug/pages/';
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
  plugins: [
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/, '.html')}`,
      inject: false,
    })),
    new MiniCssExtractPlugin({
      filename: 'css/main.min.css'
    }),
    new CopyWebpackPlugin([
      { from: 'src/imgs', to: './imgs' },
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],
  entry: {
    main: './src/js/main.js',
  },
  output: {
    filename: './js/[name].min.js',
    path: path.resolve(__dirname, './build'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /src\/libs|server/
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: './imgs',
        publicPath: '../imgs/',
      },
    },
    {
      test: /\.pug$/,
      use: ['pug-loader']
    },
    {
      test: /main\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './configs/postcss.config.js'
            }
          }
        },
        'sass-loader'
      ]
    }],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            unsafe: true,
            inline: true,
            passes: 2,
            keep_fargs: false,
          },
          output: {
            comments: false,
            beautify: false,
          },
          mangle: true,
        },
      }),
    ],
  },
}