import * as BabelNodeType from '../BabelNodeType/BabelNodeType.ts'

export const walk = <T>(node: any, visitor: any, accumulator: T): void => {
  if (!accumulator) {
    throw new Error('acc required')
  }
  if (!node) {
    return
  }
  if (Array.isArray(node)) {
    for (const item of node) {
      walk(item, visitor, accumulator)
    }
    return
  }
  visitor(node, accumulator)
  switch (node.type) {
    case BabelNodeType.File:
      walk(node.program, visitor, accumulator)
      break
    case BabelNodeType.Program:
      walk(node.body, visitor, accumulator)
      break
    case BabelNodeType.ExportNamedDeclaration:
      walk(node.declaration, visitor, accumulator)
      break
    case BabelNodeType.VariableDeclaration:
      walk(node.declarations, visitor, accumulator)
      break
    case BabelNodeType.VariableDeclarator:
      walk(node.init, visitor, accumulator)
      break
    case BabelNodeType.ArrowFunctionExpression:
      walk(node.body, visitor, accumulator)
      break
    case BabelNodeType.BlockStatement:
      walk(node.body, visitor, accumulator)
      break
    case BabelNodeType.ExpressionStatement:
      walk(node.expression, visitor, accumulator)
      break
    case BabelNodeType.AwaitExpression:
      walk(node.argument, visitor, accumulator)
      break
    case BabelNodeType.CallExpression:
      walk(node.callee, visitor, accumulator)
      break
    default:
      break
  }
}
