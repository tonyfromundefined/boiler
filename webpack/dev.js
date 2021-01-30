const {
  default: NodeHotLoaderWebpackPlugin,
} = require('node-hot-loader/NodeHotLoaderWebpackPlugin')
const base = require('./base')

module.exports = {
  ...base,
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: ['build/**/*.js'],
  },
  plugins: [
    ...base.plugins,
    new NodeHotLoaderWebpackPlugin({
      inMemory: true,
    }),
  ],
}
