const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Webpack Plugin',
    }),
    new MiniCssExtractPlugin(),
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'service-worker.js',
    }), 
    new WebpackPwaManifest({
      // TODO: Create a manifest.json:
      name: 'My Progressive Web App',
      short_name: 'PWA',
      description: 'Gabagool',
      background_color: '#ffffff',
      crossorigin: 'use-credentials',
      fingerprints: false,
      icons: [{
        src: './src/images/logo.png',
        type: 'images/png',
        sizes: [96, 128, 192, 256, 384, 512],
        purpose: 'any maskable'
      }
      ]
    }),
   
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};