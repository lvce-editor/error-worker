import * as Character from '../Character/Character.js'

export const joinLines = (lines: readonly string[]): string => {
  return lines.join(Character.NewLine)
}
