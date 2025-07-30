import * as Ajax from '../Ajax/Ajax.ts'
import * as HandleMessagePort from '../HandleMessagePort/HandleMessagePort.ts'
import * as PrettyError from '../PrettyError/PrettyError.ts'
import * as Terminate from '../Terminate/Terminate.ts'
import { tryToGetActualImportErrorMessage } from '../TryToGetActualImportErrorMessage/TryToGetActualImportErrorMessage.ts'

export const commandMap = {
  'Errors.getJson': Ajax.getJson,
  'Errors.getText': Ajax.getText,
  'Errors.handleMessagePort': HandleMessagePort.handleMessagePort2,
  'Errors.prepare': PrettyError.prepare,
  'Errors.print': PrettyError.print,
  'Errors.terminate': Terminate.terminate,
  'Errors.tryToGetActualImportErrorMessage': tryToGetActualImportErrorMessage,
}
