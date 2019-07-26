import { BaseLoader } from './baseLoader';
import { ILoaderArr } from '../interface';
export class ControllerLoader extends BaseLoader {
  constructor() {
    super();
  }
  public get(): ILoaderArr[] {
    return this.generateLoader('controller');
  }
}
