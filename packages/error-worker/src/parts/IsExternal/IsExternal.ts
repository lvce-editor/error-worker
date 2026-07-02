export const isExternal = (url: string): boolean => {
  return !url.startsWith('/') && !url.startsWith(location.protocol)
}
