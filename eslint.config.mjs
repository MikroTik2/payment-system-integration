// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
    {
        ignores: ['eslint.config.mjs', 'prisma/generated'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    eslintConfigPrettier,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
            },
        },
    },
    {
        rules: {
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/prefer-nullish-coalescing': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/dot-notation': 'off',
            '@typescript-eslint/no-unnecessary-type-assertion': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/no-misused-new': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-unsafe-enum-comparison': 'off',
            '@typescript-eslint/unbound-method': 'off',

            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'import/extensions': 'off',
            'import/prefer-default-export': 'off',
            'prefer-promise-reject-errors': 'off',
            'class-methods-use-this': 'off',
            'no-useless-constructor': 'off',
            'import/no-unresolved': 'off',
            'no-control-regex': 'off',
            'no-restricted-syntax': 'off',
            'no-shadow': 'off',
            'import/no-cycle': 'off',
            'no-useless-escape': 'off',
            'consistent-return': 'off',
            'no-underscore-dangle': 'off',
            'max-classes-per-file': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/prefer-promise-reject-errors': 'off',
            'require-await': 'off',
            '@typescript-eslint/require-await': 'off',
            '@typescript-eslint/no-empty-function': 'off',
        },
    },
);
