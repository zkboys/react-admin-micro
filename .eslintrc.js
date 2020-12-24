module.exports = {
    extends: ['react-app'],
    'parser': 'babel-eslint',
    'parserOptions': {
        ecmaVersion: 2017,
        'sourceType': 'module',
        'impliedStrict': true,
        'ecmaFeatures': {
            'jsx': true,
            'impliedStrict': true,
            'globalReturn': false,
            'experimentalObjectRestSpread': true,
            'legacyDecorators': true,
        },
    },
    'rules': {
        'jsx-a11y/anchor-is-valid': 0,
        'react-hooks/exhaustive-deps': 0,
        'import/no-anonymous-default-export': 0,
    },
};
