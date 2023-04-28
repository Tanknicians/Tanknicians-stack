import { pino } from "pino";
import { pinoHttp } from "pino-http";

// used with the back-end server
export const logger = pino(
  {
    transport: {
      target: "pino-pretty", // pretty printing
    },
  },
  pino.destination({
    dest: '../log-file', // omit for stdout
    minLength: 4096, // Buffer before writing
    sync: false, // Asynchronous logging
  }),
);

// used with Express/tRPC/HTTP methods
export const httpLogger = pinoHttp(
  {
    transport: {
      target: "pino-pretty", // pretty printing
    },
  },
  pino.destination({
    dest: '../http-log-file', // omit for stdout
    minLength: 4096, // Buffer before writing
    sync: false, // Asynchronous logging
  }),
);

// NOTE: need to have a log rotation service on the Ubuntu server
