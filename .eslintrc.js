module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'next',
    'next/core-web-vitals',
  ],
  rules: {
    '@next/next/no-img-element': 'off',
    'camelcase': ['error', { allow: ['published_at'] }],
    'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
  },
}
