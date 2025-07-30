import type * as BabelParser from '@babel/parser'
import { type File } from '@babel/types'
import type { Dependency } from '../Dependency/Dependency.ts'
import { visitNode } from '../VisitNode/VisitNode.ts'
import * as Walk from '../Walk/Walk.ts'

export const getBabelAstDependencies = (ast: BabelParser.ParseResult<File>): readonly Dependency[] => {
  const dependencies: Dependency[] = []
  Walk.walk(ast, visitNode, dependencies)
  return dependencies
}
