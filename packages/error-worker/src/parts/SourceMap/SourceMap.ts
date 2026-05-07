import * as Assert from '../Assert/Assert.ts'
import * as IsEmptyString from '../IsEmptyString/IsEmptyString.ts'
import { VError } from '../VError/VError.ts'
import * as Vlq from '../Vlq/Vlq.ts'

interface MappingState {
  originalColumn: number
  originalLine: number
  originalSourceFileIndex: number
}

const applyChunk = (state: MappingState, chunk: string): number => {
  const decodedChunk = Vlq.decode(chunk)
  state.originalSourceFileIndex += decodedChunk[1]
  state.originalLine += decodedChunk[2]
  state.originalColumn += decodedChunk[3]
  return decodedChunk[0]
}

const getOriginalPositionForLine = (lineMappings: string, column: number, state: MappingState) => {
  let currentColumn = 0
  const chunks = lineMappings.split(',')
  for (const chunk of chunks) {
    if (IsEmptyString.isEmptyString(chunk)) {
      continue
    }
    currentColumn += applyChunk(state, chunk)
    if (currentColumn >= column) {
      return {
        originalColumn: state.originalColumn,
        originalLine: state.originalLine + 1,
        originalSourceFileIndex: state.originalSourceFileIndex,
      }
    }
  }
  throw new Error('no mapping found')
}

const applyLineMappings = (lineMappings: string, state: MappingState): void => {
  if (IsEmptyString.isEmptyString(lineMappings)) {
    return
  }
  const chunks = lineMappings.split(',')
  for (const chunk of chunks) {
    applyChunk(state, chunk)
  }
}

const getColumnMapping = (mappings: string, line: number, column: number) => {
  Assert.string(mappings)
  Assert.number(line)
  Assert.number(column)
  let currentLine = 1
  const state: MappingState = {
    originalColumn: 0,
    originalLine: 0,
    originalSourceFileIndex: 0,
  }
  let index = 0

  while (index !== -1) {
    const newLineIndex = mappings.indexOf(';', index + 1)
    currentLine++
    const lineMappings = mappings.slice(index + 1, newLineIndex)
    if (currentLine === line) {
      return getOriginalPositionForLine(lineMappings, column, state)
    }
    applyLineMappings(lineMappings, state)
    index = newLineIndex
  }
  throw new Error('no mapping found')
}

export const getOriginalPosition = (sourceMap: any, line: number, column: number) => {
  try {
    Assert.object(sourceMap)
    Assert.string(sourceMap.mappings)
    Assert.array(sourceMap.sources)
    Assert.array(sourceMap.names)
    Assert.number(line)
    Assert.number(column)
    const { mappings, sources } = sourceMap
    if (!mappings) {
      throw new Error(`no source for line ${line} found`)
    }
    const { originalColumn, originalLine, originalSourceFileIndex } = getColumnMapping(mappings, line, column)
    const source = sources[originalSourceFileIndex]
    return {
      originalColumn,
      originalLine,
      source,
    }
  } catch (error) {
    throw new VError(error, 'Failed to get original sourcemap position')
  }
}
