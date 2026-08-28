import * as JoinLines from '../JoinLines/JoinLines.ts'

const httpsPrefix = 'https://'
const httpsUrlPattern = /https:\/\/[^\s)]+/g

const shortenUrl = (url: string, sameOriginPrefix: string, originLength: number): string => {
  if (!url.startsWith(sameOriginPrefix)) {
    return url
  }
  return url.slice(originLength)
}

export const formatStack = (lines: readonly string[], origin: string): string => {
  if (!origin.startsWith(httpsPrefix)) {
    return JoinLines.joinLines(lines)
  }
  const sameOriginPrefix = `${origin}/`
  const formattedLines = lines.map((line) => line.replaceAll(httpsUrlPattern, (url) => shortenUrl(url, sameOriginPrefix, origin.length)))
  return JoinLines.joinLines(formattedLines)
}
