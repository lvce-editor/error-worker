export const getOrigin = (): string => {
  if (typeof location === 'undefined') {
    return ''
  }
  return location.origin
}
