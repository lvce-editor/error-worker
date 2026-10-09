import { cp } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.ts'

const sharedProcessPath = join(root, 'node_modules', '@lvce-editor', 'shared-process', 'index.js')

const sharedProcessUrl = pathToFileURL(sharedProcessPath).toString()

const sharedProcess = await import(sharedProcessUrl)

process.env.PATH_PREFIX = '/error-worker'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
})

await cp(join(root, '.tmp', 'dist', 'dist'), join(root, 'dist', commitHash, 'packages', 'error-worker', 'dist'), { recursive: true })

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
