var path = require('path');

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, ''),
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  externals: {
    'react': 'commonjs react' 
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react')
    },
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
}