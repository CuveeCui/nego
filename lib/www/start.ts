import 'reflect-metadata';
import * as KoaApplication from 'koa';
import * as KoaRouter from 'koa-router';
import { Container } from 'inversify';
import { CTR_KEY, ME_KEY } from '../helper/constants';
import { IListener } from '../interface';
import { ControllerLoader } from '../loader/controllerLoader';
import { ModelLoader } from '../loader/modelLoader';
import { ServiceLoader } from '../loader/serviceLoader';
import { mid } from '../middleware/middleware';
import { ApplicationLoader } from '../loader/applicationLoader';
import sentry from '../service/sentry';
const camelcase = require('camelcase');
/**
 * @desc: nego application base class, everything starts here
 */
class NegoApplication {
  protected container = new Container();
  protected controller;
  protected model;
  protected service;
  protected app: KoaApplication;
  protected router: KoaRouter;
  constructor() {
    this.app = new KoaApplication();
    this.router = new KoaRouter();
    this.mount();
    this.bind();
  }
  private mount() {
    sentry(this.app);
  }
  // achieve all loaders
  private bind() {
    this.controller = new ControllerLoader().get();
    this.service = new ServiceLoader().get();
    this.model = new ModelLoader().get();
    this.bindContainer();
  }
  // bind load to container
  private bindContainer() {
    this.controller.map(ctr => {
      this.container.bind(ctr.key).to(ctr.value);
    });
    this.service.map(ser => {
      this.container.bind(ser.key).to(ser.value);
    });
    // app container is specifc, mount all servie helper logger middleware and so on
    this.container.bind('app').to(ApplicationLoader);
  }
  public start(options: IListener) {
    // use native middleware
    // use container middleware
    this.use().listen(options.port, () => {
      if (options.cb) {
        return options.cb();
      }
      console.log(`Server is running at http://127.0.0.1:${options.port}/`);
    });
  }
  private use() {
    this.useMiddleware();
    this.useRoutes();
    return this.app;
  }
  private useRoutes() {
    this.controller.forEach(ctr => {
      const Target = ctr.value;
      const prefixPath = Reflect.getMetadata(CTR_KEY, Target);
      const target = new Target();
      const prototype = Object.getPrototypeOf(target);
      Object
        .getOwnPropertyNames(prototype)
        .filter(methodName => methodName !== 'constructor' && typeof target[methodName] === 'function')
        .map(methodName => {
          const routes = Reflect.getMetadata(ME_KEY, target, methodName);
          const newTarget = this.container.get(camelcase(ctr.value.name));
          this.router[routes.method](
            `${prefixPath}${routes.path}`,
            target[routes.key].bind(newTarget),
          );
        });
    });
    this.app
            .use(this.router.routes())
            .use(this.router.allowedMethods());
  }
  private useMiddleware() {
    return mid(this.app);
  }
}

export { NegoApplication };
