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
    if (negoRedis.default(this)) {
      this.redis = negoRedis.default(this);
    }
    // load mongo
    if (negoMongo.default(this)) {
      this.mongo = negoMongo.default(this);
    }
    // load kafka
    if (negoKafka.default(this)) {
      this.kafka = negoKafka.default(this);
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
