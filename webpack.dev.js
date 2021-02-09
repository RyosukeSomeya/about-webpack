const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const path = require('path');

module.exports = merge(commonConfig, {
    mode: 'development',
    watch: true, // 監視と自動ビルド
    devtool: 'cheap-module-eval-source-map',
    // devtool: false,
    devServer: {
        open: true,
        port: 9000,
        contentBase: path.resolve(__dirname, 'public'),
    }
})