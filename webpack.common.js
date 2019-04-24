/* eslint-disable comma-dangle */
/* eslint-disable prefer-template */
/* eslint-disable no-path-concat */
// WEBPACK CONFIG!
console.log(__dirname);

module.exports = {
  entry: __dirname + '/client-details/src/index.jsx',
  output: {
    filename: 'bundle-details.js',
    path: __dirname + '/public',
  },

  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          }
        },
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  },
};
