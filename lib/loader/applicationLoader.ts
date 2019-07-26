import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import * as negoRedis from '../service/redis';
import * as negoMongo from '../service/mongo';
import * as negoKafka from '../service/kafka';
@injectable()
export class ApplicationLoader {
  public helper: any;
  public mongo: any;
  public kafka: any;
  public redis: any;
  public mysql: any;
  constructor() {
    this.loadResource();
  }
  /**
   * @desc: load nego inner config
   */
  private loadResource() {
    this.loadPlugin();
    this.loadService();
  }
  private loadHelper() {
    // TODO
  }
  private loadLogger() {
    // TODO
  }
  /**
   * @desc: load service
   */
  private loadService() {
    // load redis
    const redis = negoRedis.default(this);
    const mongo = negoMongo.default(this);
    const kafka = negoKafka.default(this);
    if (redis) {
      this.redis = redis;
    }
    // load mongo
    if (mongo) {
      this.mongo = mongo;
    }
    // load kafka
    if (kafka) {
      this.kafka = kafka;
    }
  }
  /**
   * @desc: load plugin
   * include helper logger
   */
  private loadPlugin() {
    this.loadHelper();
    this.loadLogger();
  }

}
