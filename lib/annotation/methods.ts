import 'reflect-metadata';
import { ME_KEY, METHODS_GET, METHODS_POST, METHODS_PUT, METHODS_DELETE } from '../helper/constants';
import { IMethods, IRoute } from '../interface';

export function methodFactory(
  method: IMethods,
  path: string,
): MethodDecorator {
  return (target, key) => {
    Reflect.defineMetadata(
      ME_KEY,
      { method, path, key } as IRoute,
      target,
      key,
    );
  };
}

export function get(
  path: string,
): MethodDecorator {
  return methodFactory(METHODS_GET, path);
}

export function put(
  path: string,
): MethodDecorator {
  return methodFactory(METHODS_PUT, path);
}

export function post(
  path: string,
): MethodDecorator {
  return methodFactory(METHODS_POST, path);
}

export function del(
  path: string,
): MethodDecorator {
  return methodFactory(METHODS_DELETE, path);
}
