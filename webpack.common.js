const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');  // プラグイン読み込み
const HtmlWebpackPlugin = require('html-webpack-plugin'); // プラグイン読み込み
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // プラグイン読み込み
// const FixStyleOnlyEntries = require("webpack-fix-style-only-entries");

module.exports = {
    entry: {
        app: './src/js/app.js',　// エントリーポイント1
        another: './src/js/another.js'　,// エントリーポイント2
        // pc: './src/scss/style.scss', // エントリーポイント3
        // mobile: './src/scss/test.scss' // エントリーポイント3
    },
    output: { // 出力設定
        path: path.resolve(__dirname, 'public'), // 絶対パス
        filename: 'js/[name].[contenthash].bundle.js', // 出力するファイル名
        chunkFilename: 'js/[name].[contenthash].js' // entrypoint以外から出力するファイル名
    },
    optimization: {
        splitChunks: { // バンドルファイルを分割する
            chunks: 'initial',
            cacheGroups: {
                vendor: { // 任意の名前
                    test: /node_modules/,　// 分割対象のファイルが存在する場所
                    name: 'vendor',// 出力するファイル名
                },
                vendorModules: { // 任意の名前
                    test: /src[\\/]js[\\/]modules/,　// 分割対象のファイルが存在する場所
                    name: 'vendor-modules',// 出力するファイル名
                    minSize: 0, // 分割対象になるmoduleの最小サイズ（条件）
                    minChunks: 2, // 何箇所から使われているmoduleを分割対象にするか(条件)
                },

            }
        }
    },
    module: { // ローダー設定
        rules: [
            {
                enforce: 'pre', // 他のloaderよりも先に動作する指定
                test: /\.js$/,
                exclude: /node_modules/, // 処理対象から除外する指定
                loader: 'eslint-loader',
                options: {
                    fix: true, // 一部のエラーを自動で修正
                }
            },
            {
                test: /\.js$/, // 処理対象とするファイルの指定
                exclude: /node_modules/, // 処理対象から除外する指定
                loader: 'babel-loader' // 利用するローダーを指定
            },
            {
                test: /\.scss$/, // 処理対象とするファイルの指定
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                    ] // 利用するローダーを指定(右から実行される)
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/, // 処理対象とするファイルの指定
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[contenthash].[ext]', // 出力するファイル名 [name] → バンドル前のファイル名、[ext] → バンドル前の拡張子名
                            outputPath: 'images', // 出力先
                            publicPath: '../images'　// CSSなどから読み込まれる際のパス
                        },
                    },
                    'image-webpack-loader',
                ]
            },
            {
                test: /\.html$/, // 処理対象とするファイルの指定
                loader: 'html-loader',
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            // 削除対象の指定
            // cleanOnceBeforeBuildPatterns: ['**/*', '!**.html'],
        }),
        new HtmlWebpackPlugin({
            template: './src/html/index.html', // テンプレートになるHTML
            chunks: ['app'], // 読み込ませたいファイルの指定
        }),
        new HtmlWebpackPlugin({
            filename: 'another.html', // 出力するファイル名(デフォルトはindex.html)
            template: './src/html/another.html', // テンプレートになるHTML
            chunks: ['another'], // 読み込ませたいファイルの指定
        }),
        // new FixStyleOnlyEntries(),
        new MiniCssExtractPlugin({ // CSSファイルの出力設定
            filename: './css/[name].[contenthash].css' // 出力の起点はoutputで指定したパス　[name]には、エントリーポイント名が入る
        }),
    ]
}