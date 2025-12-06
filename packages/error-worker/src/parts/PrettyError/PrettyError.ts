import * as Ajax from '../Ajax/Ajax.ts'
import * as CleanStack from '../CleanStack/CleanStack.ts'
import * as CodeFrameColumns from '../CodeFrameColumns/CodeFrameColumns.ts'
import { getErrorMessage } from '../GetErrorMessage/GetErrorMessage.ts'
import { getFile } from '../GetFile/GetFile.ts'
import * as GetSourceMapMatch from '../GetSourceMapMatch/GetSourceMapMatch.ts'
import * as IsActualSourceFile from '../IsActualSourceFile/IsActualSourceFile.ts'
import * as IsFirefox from '../IsFirefox/IsFirefox.ts'
import * as JoinLines from '../JoinLines/JoinLines.ts'
import * as Logger from '../Logger/Logger.ts'
import * as SourceMap from '../SourceMap/SourceMap.ts'

const prepareErrorMessageWithCodeFrame = (error: any) => {
  if (!error) {
    return {
      _error: error,
      codeFrame: undefined,
      message: error,
      stack: undefined,
      type: 'Error',
    }
  }
  const message = getErrorMessage(error)
  const lines = CleanStack.cleanStack(error.stack)
  const relevantStack = JoinLines.joinLines(lines)
  if (error.codeFrame) {
    return {
      _error: error,
      codeFrame: error.codeFrame,
      message,
      stack: relevantStack,
      type: error.constructor.name,
    }
  }
  return {
    _error: error,
    category: error.category,
    codeFrame: error.originalCodeFrame,
    message,
    stack: error.originalStack,
    stderr: error.stderr,
  }
}

const RE_PATH_1 = /\((.*):(\d+):(\d+)\)$/
const RE_PATH_2 = /at (.*):(\d+):(\d+)$/
const RE_PATH_3 = /@(.*):(\d+):(\d+)$/ // Firefox

const getSourceMapAbsolutePath = (file: string, relativePath: string) => {
  const folder = file.slice(0, file.lastIndexOf('/'))
  const absolutePath = folder + '/' + relativePath
  return absolutePath
}

const toAbsoluteUrl = (file: string, relativePath: string) => {
  const url = new URL(relativePath, file)
  return url.href
}

const getType = (error: any): string => {
  const constructorName = error.constructor.name
  if (constructorName === 'Object') {
    return 'Error'
  }
  return constructorName
}

const prepareErrorMessageWithoutCodeFrame = async (error: any) => {
  try {
    const lines = CleanStack.cleanStack(error.stack)
    const file = getFile(lines)
    let match = file.match(RE_PATH_1)
    match ||= file.match(RE_PATH_2)
    match ||= file.match(RE_PATH_3)
    if (!match) {
      return error
    }
    const [_, path, line, column] = match
    if (!IsActualSourceFile.isActualSourceFile(path)) {
      return error
    }
    const text = await Ajax.getText(path)
    const sourceMapMatch = GetSourceMapMatch.getSourceMapMatch(text)
    const parsedLine = Number.parseInt(line)
    const parsedColumn = Number.parseInt(column)
    const message = getErrorMessage(error)
    const relevantStack = JoinLines.joinLines(lines)
    if (sourceMapMatch) {
      const sourceMapUrl = sourceMapMatch[1]
      const sourceMapAbsolutePath = getSourceMapAbsolutePath(path, sourceMapUrl)
      const sourceMap = await Ajax.getJson(sourceMapAbsolutePath)
      const { originalColumn, originalLine, source } = SourceMap.getOriginalPosition(sourceMap, parsedLine, parsedColumn)
      const absoluteSourceUrl = toAbsoluteUrl(path, source)
      const originalSourceContent = await Ajax.getText(absoluteSourceUrl)
      const codeFrame = CodeFrameColumns.create(originalSourceContent, {
        end: {
          column: originalColumn,
          line: originalLine,
        },
        start: {
          column: originalColumn,
          line: originalLine,
        },
      })
      return {
        _error: error,
        codeFrame,
        message,
        stack: relevantStack,
        type: error.constructor.name,
      }
    }
    const codeFrame = CodeFrameColumns.create(text, {
      end: {
        column: parsedColumn,
        line: parsedLine,
      },
      start: {
        column: parsedColumn,
        line: parsedLine,
      },
    })
    return {
      _error: error,
      codeFrame,
      message,
      stack: relevantStack,
      type: getType(error),
    }
  } catch (otherError) {
    Logger.warn(`ErrorHandling Error: ${otherError}`)
    return error
  }
}

export const prepare = async (error: any) => {
  if (error && error.message && error.codeFrame) {
    return prepareErrorMessageWithCodeFrame(error)
  }
  if (error && error.stack) {
    return prepareErrorMessageWithoutCodeFrame(error)
  }
  return error
}

export const print = (error: any, prefix = '') => {
  if (IsFirefox.isFirefox) {
    // Firefox does not support printing codeframe with error stack
    if (error && error._error) {
      Logger.error(`${prefix}${error._error}`)
      return
    }
    Logger.error(`${prefix}${error}`)
    return
  }
  if (error && error.type && error.message && error.codeFrame) {
    Logger.error(`${prefix}${error.type}: ${error.message}\n\n${error.codeFrame}\n\n${error.stack}`)
    return
  }
  if (error && error.message && error.codeFrame) {
    Logger.error(`${prefix}${error.message}\n\n${error.codeFrame}\n\n${error.stack}`)
    return
  }
  if (error && error.type && error.message) {
    Logger.error(`${prefix}${error.type}: ${error.message}\n${error.stack}`)
    return
  }
  if (error && error.stack) {
    Logger.error(`${prefix}${error.stack}`)
    return
  }
  if (error === null) {
    Logger.error(`${prefix}null`)
    return
  }
  Logger.error(`${prefix}${error}`)
}

export const getMessage = (error: any) => {
  if (error && error.type && error.message) {
    return `${error.type}: ${error.message}`
  }
  if (error && error.message) {
    return `${error.constructor.name}: ${error.message}`
  }
  return `Error: ${error}`
}
