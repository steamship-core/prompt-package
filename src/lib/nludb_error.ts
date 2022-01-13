export interface RemoteErrorProps {
  code?: string
  message?: string
  suggestion?: string
}
export class RemoteError extends Error {
  code?: string
  suggestion?: string
  origMessage?: string

  constructor(props?: RemoteErrorProps) {
    const parts = []
    if (props?.code) {
      parts.push(props?.code)
    }
    if (props?.message) {
      parts.push(`Message: ${props?.message}`)
    }
    if (props?.suggestion) {
      parts.push(`Suggestion: ${props?.suggestion}`)
    }
    let baseMessage = 'Unknown server error.'
    if (parts.length > 0) {
      baseMessage = parts.join('\n')
    }
    super(baseMessage)
    this.code = props?.code
    this.origMessage = props?.message
    this.message = baseMessage
    this.suggestion = props?.suggestion

    Object.setPrototypeOf(this, RemoteError.prototype);
  }
}
