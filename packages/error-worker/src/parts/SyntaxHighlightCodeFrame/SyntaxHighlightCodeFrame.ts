import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { SyntaxHighlightingWorker } from '@lvce-editor/rpc-registry'
import * as GetSyntaxHighlightedCodeFrame from '../GetSyntaxHighlightedCodeFrame/GetSyntaxHighlightedCodeFrame.ts'
import * as Logger from '../Logger/Logger.ts'

export const syntaxHighlightCodeFrame = async (codeFrame: unknown, tokenizerPath: unknown): Promise<readonly VirtualDomNode[] | undefined> => {
  if (typeof codeFrame !== 'string' || !codeFrame || typeof tokenizerPath !== 'string' || !tokenizerPath) {
    return undefined
  }
  try {
    const lineInfos = await SyntaxHighlightingWorker.invoke('Tokenizer.tokenizeCodeBlock', codeFrame, 'javascript', tokenizerPath)
    if (!Array.isArray(lineInfos) || lineInfos.length === 0) {
      return undefined
    }
    return GetSyntaxHighlightedCodeFrame.getSyntaxHighlightedCodeFrame(lineInfos)
  } catch (error) {
    Logger.warn(`Failed to syntax highlight code frame: ${error}`)
    return undefined
  }
}
