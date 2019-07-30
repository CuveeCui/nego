import * as mongoose from 'mongoose';
const config = require(`${process.cwd()}/config`).default;

export default app => {
  if (config.mongo && config.mongo.enable) {
    const mongo = mongoose.createConnection(config.mongo.options.uri, config.mongo.options.options);
    mongo.on('connected', () => {
      // app
      //   .logger
      //   .info(`Mongo connected to: ${config.redis.options.uri}`);
      console.log(`Mongo connected to: ${config.mongo.options.uri}`);
    });
    mongo.on('error', (err) => {
      // app
      //   .logger
      //   .error(`Mongo connect to ${config.mongo.options.uri} error: ${err}`);
      console.error(`Mongo connect to ${config.mongo.options.uri} error: ${err}`);
    });
    return mongo;
  }
  return undefined;
};
