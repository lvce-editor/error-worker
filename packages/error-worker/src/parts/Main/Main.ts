import * as CommandMap from '../CommandMap/CommandMap.ts'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.ts'
import * as InitializeSyntaxHighlightingWorker from '../InitializeSyntaxHighlightingWorker/InitializeSyntaxHighlightingWorker.ts'
import * as Listen from '../Listen/Listen.ts'

export const main = async (): Promise<void> => {
  Object.assign(CommandMapRef.commandMapRef, CommandMap.commandMap)
  await Listen.listen()
  await InitializeSyntaxHighlightingWorker.initializeSyntaxHighlightingWorker()
}
