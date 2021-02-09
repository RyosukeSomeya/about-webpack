module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage', // 必要なものだけ取り込む指定
                corejs: 3,   // デフォルトは2なのでエラーとなる
                // debug: true, // 確認用
            }
        ],
    ]
}