const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')
const pnpNodeExternals = require('pnp-node-externals')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve('./src/index.ts'),
  },
  output: {
    path: path.resolve('./build'),
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '../[resource-path]',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              ['@babel/env', { targets: { node: 14 } }],
              '@babel/typescript',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              'lodash',
            ],
          },
        },
      },
      {
        test: /\.graphql$/,
        loader: require.resolve('raw-loader'),
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  resolve: {
    plugins: [PnpWebpackPlugin],
    extensions: ['.js', '.mjs', '.ts'],
    alias: {
      '~': path.resolve('./src'),
      '@boiler': path.resolve('./src/lib'),
    },
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  devtool: 'source-map',
  target: 'node',
  externals: [pnpNodeExternals()],
  stats: 'errors-only',
  optimization: {
    minimize: true,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new SimpleProgressWebpackPlugin({
      format: 'compact',
    }),
  ],
}
