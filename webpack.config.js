const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isDevMode = argv.mode !== 'production';

  return {
    devtool: isDevMode ? 'source-map' : false,
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
    },
    target: 'web',
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.html$/,
          use: ['html-loader'],
        },
        {
          test: /\.(scss|css)$/,
          use: [
            isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    devServer: {
      port: 3000,
      contentBase: path.resolve(__dirname, './dist'),
      hot: true,
      historyApiFallback: true,
    },
    resolve: {
      extensions: ['.js', '.ts', '.json', '...'],
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      ...(isDevMode ? [] : [new MiniCssExtractPlugin()]),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './public'),
          },
        ],
      }),
    ],
    optimization: {
      minimize: !isDevMode,
      minimizer: [new CssMinimizerPlugin(), '...'],
    },
  };
};
