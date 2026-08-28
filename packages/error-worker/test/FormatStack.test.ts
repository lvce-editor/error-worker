import { expect, test } from '@jest/globals'
import { formatStack } from '../src/parts/FormatStack/FormatStack.ts'

test('shortens same-origin https urls', () => {
  const lines = [
    '    at load (https://example.com/app/dist/main.js:10:2)',
    'handler@https://example.com/app/dist/worker.js?version=1:20:4',
  ]

  expect(formatStack(lines, 'https://example.com')).toBe(`    at load (/app/dist/main.js:10:2)
handler@/app/dist/worker.js?version=1:20:4`)
})

test('preserves cross-origin https urls', () => {
  const lines = ['    at load (https://cdn.example.com/app/dist/main.js?source=https://example.com/source.js:10:2)']

  expect(formatStack(lines, 'https://example.com')).toBe(
    '    at load (https://cdn.example.com/app/dist/main.js?source=https://example.com/source.js:10:2)',
  )
})

test('preserves urls from a lookalike host', () => {
  const lines = ['    at load (https://example.com.evil.test/app/dist/main.js:10:2)']

  expect(formatStack(lines, 'https://example.com')).toBe('    at load (https://example.com.evil.test/app/dist/main.js:10:2)')
})

test('preserves http urls', () => {
  const lines = ['    at load (http://localhost:3000/app/dist/main.js:10:2)']

  expect(formatStack(lines, 'http://localhost:3000')).toBe('    at load (http://localhost:3000/app/dist/main.js:10:2)')
})
