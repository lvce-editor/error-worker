import ky from 'ky'
import { VError } from '../VError/VError.ts'

export const getJson = async (url: string, options = {}): Promise<any> => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const result = await response.json()
    return result
  } catch (error) {
    if (error && error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new VError(`Failed to request json from "${url}". Make sure that the server is running and has CORS enabled`)
    }
    // @ts-ignore
    error.message = `Failed to request json from "${url}": ${error.message}`
    throw error
  }
}

export const getText = async (url: string, options = {}): Promise<string> => {
  try {
    if (url.startsWith('node:')) {
      return ''
    }
    return await ky(url, options).text()
  } catch (error) {
    if (error && error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new VError(error, `Failed to request text from "${url}". Make sure that the server is running and has CORS enabled`)
    }
    throw new VError(error, `Failed to request text from "${url}"`)
  }
}
