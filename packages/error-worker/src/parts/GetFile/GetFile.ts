const RE_PATH_1 = /\((.*):(\d+):(\d+)\)$/
const RE_PATH_2 = /at (.*):(\d+):(\d+)$/
const RE_PATH_3 = /@(.*):(\d+):(\d+)$/ // Firefox

const isIgnoredLine = (line: string, ignoredStackLines: readonly string[]): boolean => {
  return ignoredStackLines.some((ignoredStackLine) => line.includes(ignoredStackLine))
}

export const getFile = (lines: readonly string[], ignoredStackLines: readonly string[] = []): string => {
  for (const line of lines) {
    if (RE_PATH_1.test(line) || RE_PATH_2.test(line) || RE_PATH_3.test(line)) {
      if (isIgnoredLine(line, ignoredStackLines)) {
        continue
      }
      return line
    }
  }
  return ''
}
