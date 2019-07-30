import 'reflect-metadata';
import * as KoaApplication from 'koa';
import * as KoaRouter from 'koa-router';
import { Container } from 'inversify';
import { IListener } from '../interface';
/**
 * @desc: nego application base class, everything starts here
 */
declare class NegoApplication {
    protected container: Container;
    protected controller: any;
    protected model: any;
    protected service: any;
    protected app: KoaApplication;
    protected router: KoaRouter;
    constructor();
    private mount;
    private bind;
    private bindContainer;
    start(options: IListener): void;
    private use;
    private useRoutes;
    private useMiddleware;
}
export { NegoApplication };
