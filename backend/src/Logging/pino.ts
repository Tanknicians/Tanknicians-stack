import { pino } from 'pino';
import { pinoHttp } from 'pino-http';

// used with the back-end server
export const logger = pino({
  transport: {
    target: 'pino/file', // no pretty printing because it only looks good in console, not in text
    options: {
      destination: '../backend.log',
      minLength: 4096,
      sync: false
    }
  }
});

// front-end usage
export const httpLogger = pinoHttp({
  transport: {
    target: 'pino/file',
    options: {
      destination: '../frontend.log',
      minLength: 4096,
      sync: false
    }
  }
});

// NOTE: need to have a log rotation service on the Ubuntu server
