export class RemoteError extends Error {
  constructor(message: string) {
    super(message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, RemoteError.prototype);
  }
}
