import * as KoaLogger from 'koa-logger';
import * as KoaBodyParser from 'koa-bodyparser';
import * as KoaCors from '@koa/cors';

// TODO introduce koa-jwt koa-session

export const mid = (app) => {
  app
    .use(KoaLogger())
    .use(KoaBodyParser())
    .use(KoaCors({
      origin: '*',
    }));
};
