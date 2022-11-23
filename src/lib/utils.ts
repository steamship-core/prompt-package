/** Returns true if this is running using Node.js (vs the browser) */
export function isNode(): boolean {
  if (
    typeof process !== 'undefined' &&
    process.release.name.search(/node|io.js/) !== -1
  ) {
    return true;
  } else {
    return false;
  }
}
