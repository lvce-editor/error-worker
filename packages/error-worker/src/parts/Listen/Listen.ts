import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import * as CommandMapRef from '../CommandMapRef/CommandMapRef.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const listen = async (): Promise<void> => {
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMapRef.commandMapRef,
  })
  ParentRpc.set(rpc)
}
