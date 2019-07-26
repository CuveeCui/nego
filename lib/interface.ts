export interface IMetaKey {
  provide: symbol;
  inject: symbol;
  controller: symbol;
  method: symbol;
}

export type IMethods = 'get' | 'post' | 'put' | 'delete';

export type ILoader = 'controller' | 'service' | 'model' | 'config';

export interface ILoaderArr {
  key: string;
  value: any;
}

export interface IRoute {
  method: string;
  path: string;
  key?: string;
}

export interface IListener {
  port: number;
  cb?: any;
}
