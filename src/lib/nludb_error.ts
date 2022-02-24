export interface RemoteErrorProps {
  statusCode?: string
  statusMessage?: string
  statusSuggestion?: string
}
export class RemoteError extends Error {
  code?: string
  suggestion?: string
  origMessage?: string

  constructor(props?: RemoteErrorProps) {
    const parts = []
    if (props?.statusCode) {
      parts.push(props?.statusCode)
    }
    if (props?.statusMessage) {
      parts.push(`Message: ${props?.statusMessage}`)
    }
    if (props?.statusSuggestion) {
      parts.push(`Suggestion: ${props?.statusSuggestion}`)
    }
    let baseMessage = 'Unknown server error.'
    if (parts.length > 0) {
      baseMessage = parts.join('\n')
    }
    super(baseMessage)
    this.code = props?.statusCode
    this.origMessage = props?.statusMessage
    this.message = baseMessage
    this.suggestion = props?.statusSuggestion

    Object.setPrototypeOf(this, RemoteError.prototype);
  }
}
