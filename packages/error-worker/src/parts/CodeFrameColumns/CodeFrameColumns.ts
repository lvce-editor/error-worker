// @ts-nocheck
// based on https://github.com/babel/babel/blob/6be6e04f396f03feace4431f709564a8d842163a/packages/babel-code-frame/src/index.ts (License MIT)
import * as Character from '../Character/Character.ts'

/**
 * RegExp to test for newlines in terminal.
 */

const NEWLINE = /\n/

/**
 * Extract what lines should be marked and highlighted.
 */
const getMarkerLines = (loc, source, opts) => {
  const startLoc = {
    column: 0,
    line: -1,
    ...loc.start,
  }
  const endLoc = {
    ...startLoc,
    ...loc.end,
  }
  const { linesAbove = 2, linesBelow = 3 } = opts || {}
  const startLine = startLoc.line
  const startColumn = startLoc.column
  const endLine = endLoc.line
  const endColumn = endLoc.column

  let start = Math.max(startLine - (linesAbove + 1), 0)
  let end = Math.min(source.length, endLine + linesBelow)

  if (startLine === -1) {
    start = 0
  }

  if (endLine === -1) {
    end = source.length
  }

  const lineDiff = endLine - startLine
  const markerLines = {}

  if (lineDiff) {
    for (let i = 0; i <= lineDiff; i++) {
      const lineNumber = i + startLine

      if (!startColumn) {
        markerLines[lineNumber] = true
      } else if (i === 0) {
        const sourceLength = source[lineNumber - 1].length

        markerLines[lineNumber] = [startColumn, sourceLength - startColumn + 1]
      } else if (i === lineDiff) {
        markerLines[lineNumber] = [0, endColumn]
      } else {
        const sourceLength = source[lineNumber - i].length

        markerLines[lineNumber] = [0, sourceLength]
      }
    }
  } else if (startColumn === endColumn) {
    markerLines[startLine] = startColumn ? [startColumn, 0] : true
  } else {
    markerLines[startLine] = [startColumn, endColumn - startColumn]
  }

  return { start, end, markerLines }
}

export const create = (rawLines, loc, opts = {}) => {
  const lines = rawLines.split(NEWLINE)
  const { start, end, markerLines } = getMarkerLines(loc, lines, opts)
  const hasColumns = loc.start && typeof loc.start.column === 'number'

  const numberMaxWidth = String(end).length

  let frame = rawLines
    .split(NEWLINE, end)
    .slice(start, end)
    .map((line, index) => {
      const number = start + 1 + index
      const paddedNumber = ` ${number}`.slice(-numberMaxWidth)
      const gutter = ` ${paddedNumber} |`
      const hasMarker = markerLines[number]
      const lastMarkerLine = !markerLines[number + 1]
      if (hasMarker) {
        let markerLine = ''
        if (Array.isArray(hasMarker)) {
          const markerSpacing = line.slice(0, Math.max(hasMarker[0] - 1, 0)).replaceAll(/[^\t]/g, ' ')
          const numberOfMarkers = hasMarker[1] || 1

          markerLine = ['\n ', gutter.replaceAll(/\d/g, ' '), ' ', markerSpacing, '^'.repeat(numberOfMarkers)].join('')

          if (lastMarkerLine && opts.message) {
            markerLine += ' ' + opts.message
          }
        }
        return ['>', gutter, line.length > 0 ? ` ${line}` : '', markerLine].join('')
      }
      return ` ${gutter}${line.length > 0 ? ` ${line}` : ''}`
    })
    .join(Character.NewLine)

  if (opts.message && !hasColumns) {
    frame = `${' '.repeat(numberMaxWidth + 1)}${opts.message}\n${frame}`
  }

  return frame
}
