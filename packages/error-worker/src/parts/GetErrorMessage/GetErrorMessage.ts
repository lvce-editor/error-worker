export const getErrorMessage = (error: any): string => {
  if (!error) {
    return `Error: ${error}`
  }
  let { message } = error
  while (error.cause) {
    error = error.cause
    message += `: ${error}`
  }
  return message
}
