import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jest from 'eslint-plugin-jest';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        '.yarn',
        '**/node_modules/',
        '**/build/',
        '**/.tmp/',
        '**/package-lock.json',
        '**/webpack*'
    ]
}, ...compat.extends(
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
), {
    plugins: {
        jest,
        react,
        'react-hooks': fixupPluginRules(reactHooks),
        'simple-import-sort': simpleImportSort,
        '@typescript-eslint': typescriptEslint
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...jest.environments.globals.globals
        },

        parser: tsParser,
        ecmaVersion: 2021,
        sourceType: 'module',

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
                modules: true
            }
        }
    },

    settings: {
        react: {
            version: '18'
        }
    },

    rules: {
        indent: [2, 4, {
            SwitchCase: 1
        }],

        'comma-dangle': ['error', 'never'],

        'no-trailing-spaces': ['error', {
            ignoreComments: true
        }],

        'max-len': 0,

        'spaced-comment': ['error', 'always', {
            block: {
                balanced: true
            }
        }],

        'no-case-declarations': 0,
        'no-underscore-dangle': 0,
        radix: 0,
        'no-prototype-builtins': 0,
        'arrow-parens': ['error', 'as-needed'],
        'arrow-body-style': 0,
        'no-void': 0,
        'no-continue': 0,
        'no-plusplus': 0,
        'no-restricted-syntax': 0,
        'class-methods-use-this': 0,
        'no-mixed-operators': 0,
        'import/no-dynamic-require': 0,
        'prefer-promise-reject-errors': 0,
        'operator-linebreak': ['error', 'after'],
        'function-paren-newline': 0,
        'no-restricted-globals': 0,
        'default-param-last': 0,
        'consistent-return': 0,
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': 0,

        'no-unused-expressions': ['error', {
            allowShortCircuit: true
        }],

        'no-async-promise-executor': 0,
        'max-classes-per-file': 0,
        'prefer-destructuring': 0,
        'no-self-assign': 0,
        'no-return-assign': ['error', 'except-parens'],
        'no-param-reassign': 0,
        'import/no-cycle': 0,
        'import/no-import-module-exports': 0,
        'import/no-unresolved': 0,
        'import/extensions': 0,
        'react/jsx-indent': ['warn', 4],
        'react/jsx-indent-props': ['warn', 4],
        'react/forbid-prop-types': 0,
        'react/prop-types': 0,

        'react/jsx-filename-extension': ['error', {
            extensions: ['.tsx', '.jsx']
        }],

        'react/require-default-props': 0,

        'react/function-component-definition': ['error', {
            namedComponents: ['arrow-function'],
            unnamedComponents: ['arrow-function']
        }],

        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/mouse-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/alt-text': 0,
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',

        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/ban-ts-comment': 0
    }
}];
