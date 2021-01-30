const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const path = require('path')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const { EnvironmentPlugin } = require('webpack')
const { WebpackPnpExternals } = require('webpack-pnp-externals')

const git = new GitRevisionPlugin()

module.exports = {
  entry: {
    index: path.resolve('./src/index.ts'),
  },
  output: {
    path: path.resolve('./build'),
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '../[resource-path]',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
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
            plugins: ['@babel/plugin-proposal-class-properties', 'lodash'],
          },
        },
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
  externals: [WebpackPnpExternals()],
  stats: 'errors-only',
  optimization: {
    minimize: false,
  },
  plugins: [
    new EnvironmentPlugin({
      COMMITHASH: git.commithash(),
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
}
