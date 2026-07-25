import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import pluginImport from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettier from 'eslint-plugin-prettier';

export default [
  // Global ignores
  { ignores: ['dist', '.next', 'node_modules'] },
  {
    ...js.configs.recommended,
    // Additional extends: prettierConfig
    files: ['**/*.{js,mjs,cjs,jsx'],
    languageOptions: {
      ecmaVersion: latest,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      'react-hooks': pluginReactHooks,
      import: pluginImport,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
    },
  },
];
