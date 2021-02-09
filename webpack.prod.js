const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(commonConfig, {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false, // ライブラリのコメント抽出ファイルなどをしない
                terserOptions: {
                    compress: {
                        drop_console: true, // console.logを削除する
                    },
                },
            }),
            // new OptimizeCSSAssetsPlugin({})
        ]
    }
})