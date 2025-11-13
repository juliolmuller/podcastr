import nextPlugin from '@next/eslint-plugin-next';
import anyConfig from 'eslint-config-any';
import { defineConfig } from 'eslint/config';

const serverFilePatterns = ['server.cjs'];
const baseFilesPatterns = ['**/*.{js,ts,tsx}'];

export default defineConfig([
  ...anyConfig.react,
  ...[...anyConfig.node, ...anyConfig.commonjs].map((config) => ({
    ...config,
    files: serverFilePatterns,
  })),
  {
    ...nextPlugin.configs['core-web-vitals'],
    files: baseFilesPatterns,
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
      'jsx-a11y/media-has-caption': 'off',
    },
  },
]);
