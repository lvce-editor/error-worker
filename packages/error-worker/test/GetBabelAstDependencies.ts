import { expect, test } from '@jest/globals'
import { parse } from '../src/parts/BabelParser/BabelParser.ts'
import { getBabelAstDependencies } from '../src/parts/GetBabelAstDependencies/GetBabelAstDependencies.ts'

test('isBabelParseError - type error', async () => {
  const text = "export const activate = async () => {\n  const add = await import('./add.js')\n  add(1, 2)\n}\n"
  const ast = await parse(text)
  const dependencies = getBabelAstDependencies(text, ast)
  expect(dependencies).toEqual([])
})
