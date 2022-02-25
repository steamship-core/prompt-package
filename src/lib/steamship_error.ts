export interface RemoteErrorProps {
  statusCode?: string
  statusMessage?: string
  statusSuggestion?: string
}
export class RemoteError extends Error {
  statusCode?: string
  statusSuggestion?: string
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
    this.statusCode = props?.statusCode
    this.origMessage = props?.statusMessage
    this.message = baseMessage
    this.statusSuggestion = props?.statusSuggestion

    Object.setPrototypeOf(this, RemoteError.prototype);
  }
}