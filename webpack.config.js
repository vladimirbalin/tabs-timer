const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWPPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageMinWebpackPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require ('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

const isDev = process.env.NODE_ENV === 'development';
const makeCopiesOfFiles = (path) => {
  return {
    from: path,
      to: path
  };
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './js/script.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      minify: {
        collapseWhitespace: !isDev
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWPPlugin([
      makeCopiesOfFiles('img'),
      makeCopiesOfFiles('logo'),
      makeCopiesOfFiles('server.php')
    ]),
    new ImageMinWebpackPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      disable: isDev,
      plugins: [
        imageminMozjpeg({
          quality: 60,
          progressive: true
        }),
        imageminPngquant()
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  devServer: {
    port: 4200,
    hot: isDev
  },
  module: {
    rules: [
      {
        test:/\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev,
            reloadAll: true
          },
        }, 'css-loader']
      },
      {
        test: /\.(png|jpe?g|svg|gif)/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node-modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      }
    ]
  }
}