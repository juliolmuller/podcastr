module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'next',
    'lacussoft',
    'lacussoft/react',
    'lacussoft/typescript',
    'next/core-web-vitals',
  ],
  rules: {
    'camelcase': ['error', { allow: ['published_at'] }],
    'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
  },
}
