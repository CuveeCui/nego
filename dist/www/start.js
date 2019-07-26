"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const KoaApplication = require("koa");
const KoaRouter = require("koa-router");
const inversify_1 = require("inversify");
const constants_1 = require("../helper/constants");
const controllerLoader_1 = require("../loader/controllerLoader");
const modelLoader_1 = require("../loader/modelLoader");
const serviceLoader_1 = require("../loader/serviceLoader");
const middleware_1 = require("../middleware/middleware");
const applicationLoader_1 = require("../loader/applicationLoader");
const camelcase = require('camelcase');
/**
 * @desc: nego application base class, everything starts here
 */
class NegoApplication {
    constructor() {
        this.container = new inversify_1.Container();
        this.app = new KoaApplication();
        this.router = new KoaRouter();
        this.bind();
    }
    // achieve all loaders
    bind() {
        this.controller = new controllerLoader_1.ControllerLoader().get();
        this.service = new serviceLoader_1.ServiceLoader().get();
        this.model = new modelLoader_1.ModelLoader().get();
        this.bindContainer();
    }
    // bind load to container
    bindContainer() {
        this.controller.map(ctr => {
            this.container.bind(ctr.key).to(ctr.value);
        });
        this.service.map(ser => {
            this.container.bind(ser.key).to(ser.value);
        });
        this.model.map(mo => {
            this.container.bind(mo.key).to(mo.value);
        });
        // app container is specifc, mount all servie helper logger middleware and so on
        this.container.bind('app').to(applicationLoader_1.ApplicationLoader);
    }
    start(options) {
        // use native middleware
        // use container middleware
        this.use().listen(options.port, () => {
            if (options.cb) {
                return options.cb();
            }
            console.log(`Server is running at http://127.0.0.1:${options.port}/`);
        });
    }
    use() {
        this.useMiddleware();
        this.useRoutes();
        return this.app;
    }
    useRoutes() {
        this.controller.forEach(ctr => {
            const Target = ctr.value;
            const prefixPath = Reflect.getMetadata(constants_1.CTR_KEY, Target);
            const target = new Target();
            const prototype = Object.getPrototypeOf(target);
            Object
                .getOwnPropertyNames(prototype)
                .filter(methodName => methodName !== 'constructor' && typeof target[methodName] === 'function')
                .map(methodName => {
                const routes = Reflect.getMetadata(constants_1.ME_KEY, target, methodName);
                const newTarget = this.container.get(camelcase(ctr.value.name));
                this.router[routes.method](`${prefixPath}${routes.path}`, target[routes.key].bind(newTarget));
            });
        });
        this.app
            .use(this.router.routes())
            .use(this.router.allowedMethods());
    }
    useMiddleware() {
        return middleware_1.mid(this.app);
    }
}
exports.NegoApplication = NegoApplication;
new NegoApplication().start({ port: 7001 });
