import { BaseLoader } from './baseLoader';
import { ILoaderArr } from '../interface';
export class ServiceLoader extends BaseLoader {
  constructor() {
    super();
  }
  public get(): ILoaderArr[] {
    return this.generateLoader('service');
  }
}
