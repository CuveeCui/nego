import { BaseLoader } from './baseLoader';
import { ILoaderArr } from '../interface';
export class ModelLoader extends BaseLoader {
  constructor() {
    super();
  }
  public get(): ILoaderArr[] {
    return this.generateLoader('model');
  }
}
