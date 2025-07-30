import type { File } from '@babel/types'
import * as BabelParser from '@babel/parser'
import * as BabelSourceType from '../BabelSourceType/BabelSourceType.ts'

export const parse = async (code: string): Promise<BabelParser.ParseResult<File>> => {
  const ast = BabelParser.parse(code, {
    sourceType: BabelSourceType.Module,
  })
  return ast
}
