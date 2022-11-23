import { Logger } from 'tslog';

import { isNode } from './utils.js';

export default function getLogger(name: string) {
  if (isNode()) {
    const log: Logger = new Logger({ name });
    return log;
  } else {
    const log: Logger = new Logger({
      suppressStdOutput: true,
      type: 'json',
    });
    return log;
  }
}
