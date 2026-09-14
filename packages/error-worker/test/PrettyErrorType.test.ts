import { expect, test } from '@jest/globals'
import * as PrettyError from '../src/parts/PrettyError/PrettyError.ts'

test('prepare preserves an error name when the constructor is Error', async () => {
  const error = new Error('setting has an invalid type')
  Object.defineProperties(error, {
    name: { value: 'TypeError' },
    stack: { value: 'TypeError: setting has an invalid type\n    at test (test.js:1:1)' },
  })
  // @ts-ignore
  error.codeFrame = 'setting has an invalid type'

  const result = await PrettyError.prepare(error)

  expect(result).toMatchObject({
    message: 'TypeError: setting has an invalid type',
    type: 'TypeError',
  })
})
