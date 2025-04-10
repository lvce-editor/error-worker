import * as config from '@lvce-editor/eslint-config'

export default [
  ...config.default,
  {
    ignores: ['packages/text-search-worker/src/textSearchWorkerMain.ts'],
  },
]
