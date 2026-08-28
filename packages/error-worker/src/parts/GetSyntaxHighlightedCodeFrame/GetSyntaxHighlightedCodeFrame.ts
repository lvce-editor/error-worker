import { text, VirtualDomElements, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'

const getTokenDom = (tokenText: string, index: number, lineInfo: readonly string[]): readonly VirtualDomNode[] => {
  if (index % 2 !== 0) {
    return []
  }
  return [
    {
      childCount: 1,
      className: lineInfo[index + 1],
      type: VirtualDomElements.Span,
    },
    text(tokenText),
  ]
}

const getLineDom = (lineInfo: readonly string[], index: number, lineInfos: readonly (readonly string[])[]): readonly VirtualDomNode[] => {
  const hasNewLine = index < lineInfos.length - 1
  return [
    {
      childCount: lineInfo.length / 2 + Number(hasNewLine),
      className: 'SyntaxHighlightedCodeFrameLine',
      type: VirtualDomElements.Span,
    },
    ...lineInfo.flatMap(getTokenDom),
    ...(hasNewLine ? [text('\n')] : []),
  ]
}

export const getSyntaxHighlightedCodeFrame = (lineInfos: readonly (readonly string[])[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: lineInfos.length,
      className: 'SyntaxHighlightedCodeFrame',
      type: VirtualDomElements.Pre,
    },
    ...lineInfos.flatMap(getLineDom),
  ]
}
