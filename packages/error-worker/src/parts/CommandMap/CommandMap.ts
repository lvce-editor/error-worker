import * as Ajax from '../Ajax/Ajax.ts'
import * as Terminate from '../Terminate/Terminate.ts'

export const commandMap = {
  'Errors.getJson': Ajax.getJson,
  'Errors.getText': Ajax.getText,
  'Errors.terminate': Terminate.terminate,
}
