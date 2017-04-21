var path = require('path');
var paths = require('./config/paths');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var marble_web_path = '../marble/.z/duhdcam-hi3516d+ov4689-developer/z/web/onvif';

process.env.NODE_ENV = 'development';

module.exports = {
  entry: [
    require.resolve('./config/polyfills'),
    paths.appIndexJs
  ],
  output: {
    path: path.resolve(marble_web_path),
    filename: 'bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    })],
  resolve: {
    extensions: ['','.js','.jsx']
  },
  module:{
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: paths.appSrc,
      }
    ],
    loaders: [
        {
        exclude: [
          /\.html$/,
          // We have to write /\.(js|jsx)(\?.*)?$/ rather than just /\.(js|jsx)$/
          // because you might change the hot reloading server from the custom one
          // to Webpack's built-in webpack-dev-server/client?/, which would not
          // get properly excluded by /\.(js|jsx)$/ because of the query string.
          // Webpack 2 fixes this, but for now we include this hack.
          // https://github.com/facebookincubator/create-react-app/issues/1713
          /\.(js|jsx)(\?.*)?$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/,
          /\.sass$/,
          /\.scss$/
        ],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: 'babel',
        query: {
          plugins: [
            ['import', [{libraryName: "antd", style: 'css'}]]
          ],
          cacheDirectory: true
        }
      },
      {
        test    : /\.css$/,
        loaders : ["style-loader", "css-loader"]
      },
      {
        test    : /\.scss$/,
        loaders : ["style", "css", "sass"]
      },
      {
        test    : /\.json$/,
        exclude : /node_modules/,
        loader  : "json-loader"
      }
    ]
  }
}
