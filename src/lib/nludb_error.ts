export class NLUDBError extends Error {
  constructor(message: string) {
    super(message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NLUDBError.prototype);
  }
}
