import { expect, test } from '@jest/globals'
import * as BabelParser from '../src/parts/BabelParser/BabelParser.ts'

test('listen - creates rpc client and sets it', async () => {
  const code = 'let x = 1'
  const ast = await BabelParser.parse(code)
  expect(ast.type).toBe('File')
  expect(ast.program.body[0].type).toBe('VariableDeclaration')
})
