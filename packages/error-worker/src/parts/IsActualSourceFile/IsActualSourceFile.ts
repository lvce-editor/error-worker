export const isActualSourceFile = (path: string): boolean => {
  return !(
    path === '<anonymous>' ||
    path === 'debugger eval code' ||
    path.startsWith('"') ||
    path.startsWith("'") ||
    path.startsWith(')') ||
    path.startsWith('file://')
  )
}
