module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    '@lacussoft/typescript',
  ],
  ignorePatterns: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    'camelcase': ['error', { allow: ['published_at'] }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debug': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-indent': ['error', 2, {
      checkAttributes: true,
      indentLogicalExpressions: true,
    }],
    'react/jsx-indent-props': ['error', 2],
    'react/prop-types': 'off',
  },
}
