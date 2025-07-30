export const isExternal = (url: string): boolean => {
  if (url.startsWith('/')) {
    return false
  }
  if (url.startsWith(location.protocol)) {
    return false
  }
  return true
}
