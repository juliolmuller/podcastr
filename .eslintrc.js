module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'lacussoft',
    'lacussoft/react',
    'lacussoft/typescript',
  ],
  rules: {
    'camelcase': ['error', { allow: ['published_at'] }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debug': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}
