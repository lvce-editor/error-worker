import { LazyTransferMessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

const rpcPromise = LazyTransferMessagePortRpcParent.create({
  commandMap: {},
  send: (port) => RendererWorker.sendMessagePortToSyntaxHighlightingWorker(port),
})

export const invoke = async (method: string, ...params: readonly unknown[]): Promise<unknown> => {
  const rpc = await rpcPromise
  return rpc.invoke(method, ...params)
}
