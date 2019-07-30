const Raven = require('raven');
const config = require(`${process.cwd()}/config`).default;
Raven.config(config.sentry).install();
export default (app) => {
  app.on('error', (err: any) => {
    Raven.captureException(err, (error: any, eventId: any) => {
      console.log(`sentry ${eventId} error: ${error}`);
    });
  });
};
