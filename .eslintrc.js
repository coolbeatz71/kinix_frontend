module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaVersion: 8, warnOnUnsupportedTypeScriptVersion: false },
    ignorePatterns: ['node_modules/*', '.next/*', '.out/*', '!.prettierrc.js'],
    overrides: [
        {
            globals: {
                React: 'writable',
            },
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            settings: { react: { version: 'detect' } },
            env: {
                browser: true,
                node: true,
                es6: true,
            },
            plugins: ['@typescript-eslint', 'react', 'prettier'],
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:react/recommended',
                'plugin:prettier/recommended',
                'plugin:react-hooks/recommended',
                'plugin:@next/next/recommended',
            ],
            rules: {
                'react/prop-types': 'off',
                'react/react-in-jsx-scope': 'off',
                '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', ignoreRestSiblings: false }],
                'no-nested-ternary': 'off',
                'no-irregular-whitespace': 'off',
                'react/no-children-prop': 'off',
                'react/display-name': 'off',
                'no-self-assign': 'off',
                '@typescript-eslint/explicit-function-return-type': [
                    'warn',
                    {
                        allowExpressions: true,
                        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
                    },
                ],
            },
        },
    ],
};
