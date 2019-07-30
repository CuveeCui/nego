import 'reflect-metadata';
import { IMethods } from '../interface';
export declare function methodFactory(method: IMethods, path: string): MethodDecorator;
export declare function get(path: string): MethodDecorator;
export declare function put(path: string): MethodDecorator;
export declare function post(path: string): MethodDecorator;
export declare function del(path: string): MethodDecorator;
