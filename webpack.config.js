const MODE = 'development';
const enabledSourceMap = (MODE === 'development');

const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    mode: 'development',//ソースマップ有効 production指定で圧縮
    entry: './src/application.js',
    output: {
        path: `${__dirname}/dist`,
        filename: 'application.js'
    },
    devServer: {
        contentBase: 'dist',
        open: true
    },
    module: {
        rules: [
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: enabledSourceMap,//ソースマップ有効
                            importLoaders: 3
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: enabledSourceMap,
                            plugins: [
                                require('autoprefixer')({ grid: true })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: enabledSourceMap,
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpg|svg)$/,
                loader: 'url-loader',//画像をBase64として取り込む
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['env', {'modules': false}]
                            ]
                        }
                    }
                ],
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new SpritesmithPlugin({
            src: {
                cwd: './sprite/',
                glob: '*.png'
            },
            target: {
                image: './dist/img/sprite.png',
                css: './src/scss/_sprite.scss'
            },
            apiOptions: {
                cssImageRef: "./img/sprite.png"
            },
        })
    ]
}