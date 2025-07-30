import { expect, test } from '@jest/globals'
import { parse } from '../src/parts/BabelParser/BabelParser.ts'
import { getBabelAstDependencies } from '../src/parts/GetBabelAstDependencies/GetBabelAstDependencies.ts'

test('getBabelAstDependencies - dynamic import', async () => {
  const text = "export const activate = async () => {\n  const add = await import('./add.js')\n  add(1, 2)\n}\n"
  const ast = await parse(text)
  const dependencies = getBabelAstDependencies(ast)
  expect(dependencies).toEqual([
    {
      end: 75,
      relativePath: './add.js',
      start: 65,
    },
  ])
})

test('getBabelAstDependencies - normal import', async () => {
  const text = "import { add }  from './add.js';\nexport const activate = async () => {\n  add(1, 2)\n}\n"
  const ast = await parse(text)
  const dependencies = getBabelAstDependencies(ast)
  expect(dependencies).toEqual([
    {
      end: 31,
      relativePath: './add.js',
      start: 21,
    },
  ])
})

test('getBabelAstDependencies - toplevel await import', async () => {
  const text = "const add = await import('./add.js');\nexport const activate = async () => {\n  add(1, 2)\n}\n"
  const ast = await parse(text)
  const dependencies = getBabelAstDependencies(ast)
  expect(dependencies).toEqual([
    {
      end: 35,
      relativePath: './add.js',
      start: 25,
    },
  ])
})
