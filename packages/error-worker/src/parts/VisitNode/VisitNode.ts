import { is } from '@babel/types'
import type { Dependency } from '../Dependency/Dependency.ts'
import * as BabelNodeType from '../BabelNodeType/BabelNodeType.ts'

export const visitNode = (node: any, dependencies: Dependency[]): void => {
  if ((is(BabelNodeType.ImportDeclaration, node) || is(BabelNodeType.ExportAllDeclaration, node)) && node.source.start && node.source.end) {
    const relativePath = node.source.value
    const { start } = node.source
    const { end } = node.source
    dependencies.push({ end, relativePath, start })
  }
  if (node && is(BabelNodeType.ImportExpression, node) && is(BabelNodeType.StringLiteral, node.source) && node.source.start && node.source.end) {
    const relativePath = node.source.value
    const { end, start } = node.source
    dependencies.push({ end, relativePath, start })
  }
}
