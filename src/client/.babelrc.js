module.exports = {
  presets: [require.resolve('next/babel')],
  plugins: [
    [
      require.resolve('babel-plugin-relay'),
      {
        artifactDirectory: 'src/client/__generated__',
      },
    ],
    require.resolve('@emotion/babel-plugin'),
  ],
}
