const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const base = require('./base')

module.exports = {
  ...base,
  mode: 'production',
  plugins: [
    ...base.plugins,
    new SimpleProgressWebpackPlugin({
      format: 'compact',
    }),
  ],
}
