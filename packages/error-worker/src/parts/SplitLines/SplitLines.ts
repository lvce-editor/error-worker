import * as Assert from '../Assert/Assert.ts'
import * as Character from '../Character/Character.ts'

export const splitLines = (lines: string): readonly string[] => {
  Assert.string(lines)
  return lines.split(Character.NewLine)
}
