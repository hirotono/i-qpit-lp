const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => {
  let mode = argv.mode;
  let devMode = mode === 'development';
  let enabledSourceMap = devMode;

  return [
    {
      entry: ['@babel/polyfill','./src/javascript/application.js'],
      output: {
        path: path.resolve(__dirname, './public/sema/js'),
        filename: 'application.js'
      },
      devServer: {
        contentBase: 'public',
        open: true
      },
      optimization: {
        minimizer: [
          new UglifyJSPlugin({
            cache: true,
            uglifyOptions: { compress: { drop_console: true } },
            parallel: true
          })
        ]
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            use: [
              {
                loader: 'babel-loader?cacheDirectory',
                options: {
                  presets: [
                    '@babel/preset-env' // ES2018をES5に変換
                  ]
                }
              },
            ]
          },
          {
            test: /\.vue$/,
            use: [
              {
                loader: 'vue-loader'
              },
            ]
          }
        ]
      },
      resolve: {
        extensions: ['.js'],
        alias: {
          vue$: 'vue/dist/vue.common.js'
      }
      },
      cache: true
    },
    {
      entry: {
        application: './src/scss/application.scss'
      },
      output: {
        path: path.resolve(__dirname, './public/sema/css'),
        filename: `site_base_new.css`
      },
      module: {
        rules: [
          {
            test: /\.(sa|sc|c)ss$/,
            use: ExtractTextPlugin.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: enabledSourceMap, //ソースマップ利用設定
                    importLoaders: 2
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: enabledSourceMap,
                    plugins: [
                      require('autoprefixer')({
                        grid: true, //CSS Grid Layout利用設定
                        browsers: [
                          'last 2 versions',
                          'Android >= 4',
                          'iOS >= 8'
                        ]
                      })
                    ]
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: enabledSourceMap //ソースマップ利用設定
                  }
                }
              ]
            })
          },
          {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'url-loader'
          },
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: '../../img/i/',
                  publicPath: '../../img/i/'
                }
              }
            ]
          }
        ]
      },
      plugins: [
        new ExtractTextPlugin('site_base_new.css'),
        new SpritesmithPlugin({
          src: {
            cwd: './src/sprite_assets/',
            glob: '*.png'
          },
          target: {
              image: './public/img/i/sprite-[hash].png',
              css: './src/scss/_sprite.scss'
          },
          apiOptions: {
              cssImageRef: "./img/i/sprite.png"
          },
          spritesmithOptions: {
            padding: 4
          }
        }),
      ],
      cache: true
    }
  ];
};