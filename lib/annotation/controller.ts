import 'reflect-metadata';
import { CTR_KEY } from '../helper/constants';
export function controller(
  identifier?: string,
): ClassDecorator {
  return (target: any) => {
    if (!identifier) {
      // tslint:disable-next-line: no-parameter-reassignment
      identifier = '';
    }
    Reflect.defineMetadata(CTR_KEY, identifier, target);
    return target;
  };
}
