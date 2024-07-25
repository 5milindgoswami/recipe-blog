const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './app.js', // Adjust this to your main server file
  target: 'node',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new webpack.IgnorePlugin({
        resourceRegExp: /^kerberos$/,
        contextRegExp: /mongodb\//,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^snappy$/,
        contextRegExp: /mongodb\//,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^socks$/,
        contextRegExp: /mongodb\//,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^gcp-metadata$/,
        contextRegExp: /mongodb\//,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^@aws-sdk\/credential-providers$/,
        contextRegExp: /mongodb\//,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^@mongodb-js\/zstd$/,
        contextRegExp: /mongodb\//,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^mongodb-client-encryption$/,
        contextRegExp: /mongodb\//,
    }),
],
};
