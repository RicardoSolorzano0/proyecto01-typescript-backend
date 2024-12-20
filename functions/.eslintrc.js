module.exports = {
    env: {
        es6: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/recommended'
    ],
    ignorePatterns: [
        '/lib/**/*', // Ignore built files.
        '/src/index.ts'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./tsconfig.json', './tsconfig.dev.json'],
        sourceType: 'module'
    },
    plugins: [
        '@stylistic',
        '@typescript-eslint',
        'import'
    ],
    root: true,
    rules: {
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                'argsIgnorePattern': '^_',
                'varsIgnorePattern': '^_',
                'caughtErrorsIgnorePattern': '^_'
            }
        ],
        'import/no-unresolved': 0,
        'import/order': [
            'error', {
                'alphabetize': {
                    'order': 'asc',
                    'caseInsensitive': true
                },
                'groups': [
                    ['external', 'builtin'],
                    'internal',
                    ['sibling', 'parent'],
                    'index',
                    'unknown'
                ],
                'pathGroups': [
                    {
                        'group': 'internal',
                        'pattern': '@/**/*'
                    }
                ],
                'pathGroupsExcludedImportTypes': [],
                'warnOnUnassignedImports': true
            }
        ],
        'indent': ['error', 4],
        'max-len': ['warn', 120],
        'object-curly-spacing': ['error', 'always'],
        'quotes': ['error', 'single'],
        'sort-imports': [
            'error',
            {
                'ignoreCase': true,
                'ignoreDeclarationSort': true
            }
        ],
        '@stylistic/block-spacing': 'warn',
        '@stylistic/brace-style': 'warn',
        '@stylistic/comma-dangle': 'warn',
        '@stylistic/comma-spacing': 'warn',
        '@stylistic/function-call-spacing': 'warn',
        '@stylistic/key-spacing': 'warn',
        '@stylistic/keyword-spacing': 'warn',
        '@stylistic/member-delimiter-style': [
            'warn',
            {
                'multiline': {
                    'delimiter': 'semi',
                    'requireLast': true
                },
                'singleline': {
                    'delimiter': 'semi',
                    'requireLast': true
                },
                'multilineDetection': 'brackets'
            }
        ],
        '@stylistic/object-curly-spacing': [
            'warn',
            'always'
        ],
        '@stylistic/quotes': [
            'error',
            'single',
            {
                'avoidEscape': true,
                'allowTemplateLiterals': true
            }
        ],
        '@stylistic/semi': 'warn',
        '@stylistic/space-before-blocks': 'warn',
        '@stylistic/space-infix-ops': 'warn',
        '@stylistic/type-annotation-spacing': 'warn',
        '@stylistic/no-extra-parens': [
            'error',
            'all',
            {
                'conditionalAssign': true,
                'ignoreJSX': 'multi-line'
            }
        ],
        '@stylistic/arrow-parens': [
            'error',
            'as-needed'
        ]
    }
};