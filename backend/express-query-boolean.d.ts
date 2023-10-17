declare module 'express-query-boolean' {
  import { RequestHandler } from 'express';
  function expressQueryBoolean(): RequestHandler;
  export = expressQueryBoolean;
}
