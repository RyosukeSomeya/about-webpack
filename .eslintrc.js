module.exports = {
    root: true, // .eslintrc.jsがあるディレクトリより親の階層に設定ファイルを探しに行かないよう設定
    env: {
        browser: true, // browserで使用するJSかどうか
        es2020: true, // es2020の記法でもerrorを出さない
    },
    parserOptions: {
        sourceType: 'module', // import exportでエラーを出さない
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'], // 適用するルール(まとまったルール), 'plugin:prettier/recommend'は最後に記述
    rules: {
        'prefer-const': 'error'
    }
}