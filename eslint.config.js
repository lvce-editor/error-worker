import { defineConfig } from 'eslint/config'
import * as config from '@lvce-editor/eslint-config'

export default defineConfig([
  ...config.default,
  ...config.recommendedActions,
  {
    rules: {
      'unicorn/prefer-spread': 'off',

      // TODO
      '@typescript-eslint/explicit-function-return-type': 'off',
      'unicorn/numeric-separators-style': 'off',
      'no-console': 'off',
      'no-useless-escape': 'off',
      'unicorn/error-message': 'off',
      'jest/no-restricted-jest-methods': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    },
  },
  {
    // The pinned application supplies its own Node runtime.
    files: ['.github/workflows/integration.yml'],
    rules: { 'github-actions/node-version-file': 'off', 'github-actions/on': 'off' },
  },
  {
    // Preserve real DOM input events covered by the migrated application scenarios.
    files: ['packages/e2e-integration/src/viewlet.error-syntax-highlighting.ts'],
    rules: { '@typescript-eslint/no-deprecated': 'off' },
  },
])
