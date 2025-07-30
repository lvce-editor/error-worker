export interface LineAndColumn {
  readonly line: number
  readonly column: number
}

export const getLineAndColumn = (text: string, start: number, end: number): LineAndColumn => {
  let index = -1
  let line = 0
  const column = 0
  while ((index = text.indexOf('\n', index + 1)) !== -1) {
    line++
    if (index >= start) {
      break
    }
  }
  return {
    line,
    column,
  }
}
