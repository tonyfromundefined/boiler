const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const NodemonPlugin = require('nodemon-webpack-plugin')
const path = require('path')
const pnpNodeExternals = require('pnp-node-externals')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')

module.exports = {
  mode: 'development',
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
            cacheDirectory: true,
            presets: [
              '@babel/typescript',
              ['@babel/env', { targets: { node: 14 } }],
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
    minimize: false,
  },
  watch: true,
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new NodemonPlugin({
      script: './build/index.js',
      watch: path.resolve('./build'),
      nodeArgs: [...(process.env.DEBUG === 'true' ? ['--inspect'] : [])],
    }),
  ],
}
