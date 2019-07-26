import { ILoader, ILoaderArr } from '../interface';
import * as glob from 'glob';

const camelcase = require('camelcase');
export class BaseLoader {
  public cwd: string;
  constructor() {
    this.cwd = process.cwd();
  }
  public generateLoader(loader: ILoader): ILoaderArr[] {
    // todo
    return this.filesPath(loader);
  }
  protected filesPath(loader: ILoader): ILoaderArr[] {
    const files = glob.sync(`${this.cwd}/src/${loader}/**/*`);
    const loaders: ILoaderArr[] = [];
    files.forEach(file => {
      const fileLoader = require(file);
      Object.keys(fileLoader).map(key => {
        loaders.push({
          key: camelcase(key),
          value: fileLoader[key],
        } as ILoaderArr);
      });
    });
    return loaders;
  }
}
