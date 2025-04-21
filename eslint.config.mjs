import nextPlugin from '@next/eslint-plugin-next';
import anyConfig from 'eslint-config-any';

export default [
  ...anyConfig.react,

  {
    ...nextPlugin.flatConfig.coreWebVitals,
    files: ['**/*.{js,cjs,mjs,jsx,mjsx,ts,mts,tsx,mtsx}'],
  },
  {
    rules: {
      '@next/next/no-img-element': 'off',
      camelcase: [
        'error',
        {
          allow: ['published_at'],
        },
      ],
    },
  },
];
