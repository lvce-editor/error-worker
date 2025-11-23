import * as config from '@lvce-editor/eslint-config'
import * as actions from '@lvce-editor/eslint-plugin-github-actions'

export default [
  ...config.default,
  ...actions.default,
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
]
