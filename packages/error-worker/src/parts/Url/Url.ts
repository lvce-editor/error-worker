import * as Location from '../Location/Location.ts'

export const getAbsoluteUrl = (relativePath: string, sourceUrl: string): string => {
  if (sourceUrl.startsWith('/')) {
    const origin = Location.getOrigin()
    const absoluteSourceUrl = new URL(sourceUrl, origin).href
    return new URL(relativePath, absoluteSourceUrl).href
  }
  return new URL(relativePath, sourceUrl).href
}
