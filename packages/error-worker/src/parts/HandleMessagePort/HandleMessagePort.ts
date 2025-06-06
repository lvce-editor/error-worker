import { PlainMessagePortRpcParent } from '@lvce-editor/rpc'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.ts'

export const handleMessagePort2 = async (port: MessagePort): Promise<void> => {
  await PlainMessagePortRpcParent.create({
    messagePort: port,
    commandMap: CommandMapRef.commandMapRef,
  })
}
