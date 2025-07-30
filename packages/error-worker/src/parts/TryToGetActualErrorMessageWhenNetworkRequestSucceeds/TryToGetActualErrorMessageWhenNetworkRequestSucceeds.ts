import type { Dependency } from '../Dependency/Dependency.ts'
import { BabelParseError } from '../BabelParseError/BabelParseError.ts'
import * as BabelParser from '../BabelParser/BabelParser.ts'
import { ContentSecurityPolicyError } from '../ContentSecurityPolicyError/ContentSecurityPolicyError.ts'
import * as ContentSecurityPolicyErrorState from '../ContentSecurityPolicyErrorState/ContentSecurityPolicyErrorState.ts'
import { DependencyNotFoundError } from '../DependencyNotFoundError/DependencyNotFoundError.ts'
import * as GetBabelAstDependencies from '../GetBabelAstDependencies/GetBabelAstDependencies.ts'
import * as HttpStatusCode from '../HttpStatusCode/HttpStatusCode.ts'
import * as IsBabelParseError from '../IsBabelParseError/IsBabelParseError.ts'
import { isExternal } from '../IsExternal/IsExternal.ts'
import * as Url from '../Url/Url.ts'

const getErrorInDependencies = async (text: string, url: string, dependencies: readonly Dependency[], seenUrls: any): Promise<void> => {
  for (const dependency of dependencies) {
    const dependencyUrl = Url.getAbsoluteUrl(dependency.relativePath, url)
    if (isExternal(dependencyUrl) || seenUrls.includes(dependencyUrl)) {
      continue
    }
    seenUrls.push(dependencyUrl)
    // let dependencyResponse
    // try {
    const dependencyResponse = await fetch(dependencyUrl)
    // } catch (error) {}
    if (dependencyResponse.ok) {
      await tryToGetActualErrorMessage(null, dependencyUrl, dependencyResponse, seenUrls)
    } else {
      switch (dependencyResponse.status) {
        case HttpStatusCode.NotFound:
          throw new DependencyNotFoundError(text, dependency.start, dependency.end, dependency.relativePath, dependencyUrl, url)
        default:
          break
        // return `Failed to import ${url}: ${error}`
      }
    }
  }
}

export const tryToGetActualErrorMessage = async (error: any, url: string, response: Response, seenUrls: readonly string[] = []): Promise<string> => {
  let text
  try {
    text = await response.text()
  } catch {
    return `Failed to import ${url}: Unknown Network Error`
  }
  let ast
  try {
    ast = await BabelParser.parse(text)
  } catch (error) {
    if (IsBabelParseError.isBabelError(error)) {
      throw new BabelParseError(url, error)
    }
    throw error
  }
  const dependencies = GetBabelAstDependencies.getBabelAstDependencies(ast)
  await getErrorInDependencies(text, url, dependencies, seenUrls)
  if (ContentSecurityPolicyErrorState.hasRecentErrors()) {
    const recentError = ContentSecurityPolicyErrorState.getRecentError()
    // @ts-ignore
    throw new ContentSecurityPolicyError(recentError.violatedDirective, recentError.sourceFile, recentError.lineNumber, recentError.columnNumber)
  }
  const contentType = response.headers.get('Content-Type')
  if (url.endsWith('.ts') && contentType === null) {
    return `Failed to import ${url}: Missing Content-Type header for javascript`
  }
  return `Failed to import ${url}: Unknown Network Error`
}
