module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',    
    'standard-with-typescript',
    'plugin:prettier/recommended',
    'next/core-web-vitals',
  ],
  ignorePatterns: [
    ".eslintrc.js",
    "node_modules/",
  ],
  overrides: [
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    'simple-import-sort'
  ],
  rules: {
    quotes: ["error", "single"],

    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',

    '@typescript-eslint/no-unused-vars': 'warn',    
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}
