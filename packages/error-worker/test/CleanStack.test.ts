import { expect, test } from '@jest/globals'
import { cleanStack } from '../src/parts/CleanStack/CleanStack.ts'

test('removes node internal stack', () => {
  const stack = `errorWorkerMain.js:2015 Error: Utility process exited before ipc connection was established: Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'extract-zip' imported from C:\Users\simon\AppData\Local\Programs\lvce\resources\app\packages\shared-process\node_modules\@lvce-editor\ripgrep\src\downloadRipGrep.js
    at Object.create$6 [as create] (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/main-process/dist/mainProcessMain.js:2429:11)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async Object.create$i [as create] (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/main-process/dist/mainProcessMain.js:3224:18)
    at async createUtilityProcessRpc (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/main-process/dist/mainProcessMain.js:5651:15)
    at async getResponse (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/main-process/dist/mainProcessMain.js:3020:109)
    at async handleJsonRpcMessage (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/main-process/dist/mainProcessMain.js:3077:24)
    at unwrapJsonRpcResult (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/shared-process/node_modules/@lvce-editor/json-rpc/dist/index.js:210:27)
    at invokeHelper (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/shared-process/node_modules/@lvce-editor/json-rpc/dist/index.js:410:10)
    at async Module.createUtilityProcessRpc (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/s…d-process/src/parts/CreateUtilityProcessRpc/CreateUtilityProcessRpc.js:3:5)
    at async Module.create (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/s…rentWithElectronUtilityProcess/IpcParentWithElectronUtilityProcess.js:13:5)
    at async Module.create (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/shared-process/src/parts/IpcParent/IpcParent.js:5:20)
    at async Module.launchProcess (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/shared-process/src/parts/LaunchProcess/LaunchProcess.js:18:17)
    at async Module.launchSearchProcess (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/shared-process/src/parts/LaunchSearchProcess/LaunchSearchProcess.js:5:17)
    at async Module.handleIncomingIpcMessagePort (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/s…rc/parts/HandleIncomingIpcMessagePort/HandleIncomingIpcMessagePort.js:2:20)
    at async Module.handleIncomingIpc (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/shared-process/src/parts/HandleIncomingIpc/HandleIncomingIpc.js:20:34)
    at async getResponse (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/shared-process/node_modules/@lvce-editor/json-rpc/dist/index.js:321:109)
    at async Module.handleJsonRpcMessage (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/shared-process/node_modules/@lvce-editor/json-rpc/dist/index.js:380:24)
    at restoreJsonRpcError (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:333:24)
    at unwrapJsonRpcResult (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:389:27)
    at invokeHelper (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:421:10)
    at async invokeAndTransfer$7 (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:1783:18)
    at async sendMessagePortToElectron (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:6301:3)
    at async Object.create$Q [as create] (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:6322:7)
    at async create$10 (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:1195:18)
    at async launchSearchProcess (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:13542:15)
    at async invoke$f (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:13566:15)
    at unwrapJsonRpcResult (lvce://-/packages/file-search-worker/dist/fileSearchWorkerMain.js:614:27)
    at invokeHelper (lvce://-/packages/file-search-worker/dist/fileSearchWorkerMain.js:800:10)
    at async searchFile (lvce://-/packages/file-search-worker/dist/fileSearchWorkerMain.js:3627:18)
    at async searchFile$5 (lvce://-/packages/file-search-worker/dist/fileSearchWorkerMain.js:2394:18)
    at async searchFile$4 (lvce://-/packages/file-search-worker/dist/fileSearchWorkerMain.js:2415:17)
    at async getPicks$9 (lvce://-/packages/file-search-worker/dist/fileSearchWorkerMain.js:2442:17)
    at async loadContent (lvce://-/packages/file-search-worker/dist/fileSearchWorkerMain.js:3045:20)
    at async wrapped (lvce://-/packages/file-search-worker/dist/fileSearchWorkerMain.js:1380:28)
    at restoreJsonRpcError (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:333:24)
    at unwrapJsonRpcResult (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:389:27)
    at invokeHelper (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:421:10)
    at async Object.loadContent$f [as loadContent] (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:23676:3)
    at async load$6 (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:3584:20)
    at async openWidget (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:4095:20)
    at async show$6 (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:12771:3)
    at async handleKeyBinding$1 (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:3816:3)
    at async handleJsonRpcMessage (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:892:3)`

  expect(cleanStack(stack)).toEqual([
    `    at create$6 [as create] (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/main-process/dist/mainProcessMain.js:2429:11)`,
    `    at async create$i [as create] (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/main-process/dist/mainProcessMain.js:3224:18)`,
    `    at async createUtilityProcessRpc (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/main-process/dist/mainProcessMain.js:5651:15)`,
    `    at async getResponse (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/main-process/dist/mainProcessMain.js:3020:109)`,
    `    at async handleJsonRpcMessage (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/main-process/dist/mainProcessMain.js:3077:24)`,
    `    at invokeHelper (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/shared-process/node_modules/@lvce-editor/json-rpc/dist/index.js:410:10)`,
    `    at async createUtilityProcessRpc (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/s…d-process/src/parts/CreateUtilityProcessRpc/CreateUtilityProcessRpc.js:3:5)`,
    `    at async create (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/s…rentWithElectronUtilityProcess/IpcParentWithElectronUtilityProcess.js:13:5)`,
    `    at async create (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/shared-process/src/parts/IpcParent/IpcParent.js:5:20)`,
    `    at async launchProcess (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/shared-process/src/parts/LaunchProcess/LaunchProcess.js:18:17)`,
    `    at async launchSearchProcess (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/shared-process/src/parts/LaunchSearchProcess/LaunchSearchProcess.js:5:17)`,
    `    at async handleIncomingIpcMessagePort (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/s…rc/parts/HandleIncomingIpcMessagePort/HandleIncomingIpcMessagePort.js:2:20)`,
    `    at async handleIncomingIpc (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/shared-process/src/parts/HandleIncomingIpc/HandleIncomingIpc.js:20:34)`,
    `    at async getResponse (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/shared-process/node_modules/@lvce-editor/json-rpc/dist/index.js:321:109)`,
    `    at async handleJsonRpcMessage (file:///C:/Users/test/AppData/Local/Programs/lvce/resources/app/packages/shared-process/node_modules/@lvce-editor/json-rpc/dist/index.js:380:24)`,
    `    at invokeHelper (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:421:10)`,
    `    at async invokeAndTransfer$7 (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:1783:18)`,
    `    at async sendMessagePortToElectron (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:6301:3)`,
    `    at async create$Q [as create] (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:6322:7)`,
    `    at async create$10 (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:1195:18)`,
    `    at async launchSearchProcess (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:13542:15)`,
    `    at async invoke$f (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:13566:15)`,
    `    at invokeHelper (lvce://-/packages/file-search-worker/dist/fileSearchWorkerMain.js:800:10)`,
    `    at async searchFile (lvce://-/packages/file-search-worker/dist/fileSearchWorkerMain.js:3627:18)`,
    `    at async searchFile$5 (lvce://-/packages/file-search-worker/dist/fileSearchWorkerMain.js:2394:18)`,
    `    at async searchFile$4 (lvce://-/packages/file-search-worker/dist/fileSearchWorkerMain.js:2415:17)`,
    `    at async getPicks$9 (lvce://-/packages/file-search-worker/dist/fileSearchWorkerMain.js:2442:17)`,
    `    at async loadContent (lvce://-/packages/file-search-worker/dist/fileSearchWorkerMain.js:3045:20)`,
    `    at async wrapped (lvce://-/packages/file-search-worker/dist/fileSearchWorkerMain.js:1380:28)`,
    `    at invokeHelper (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:421:10)`,
    `    at async loadContent$f [as loadContent] (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:23676:3)`,
    `    at async load$6 (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:3584:20)`,
    `    at async openWidget (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:4095:20)`,
    `    at async show$6 (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:12771:3)`,
    `    at async handleKeyBinding$1 (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:3816:3)`,
    `    at async handleJsonRpcMessage (lvce://-/packages/renderer-worker/dist/rendererWorkerMain.js:892:3)`,
  ])
})
