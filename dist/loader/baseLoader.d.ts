import { ILoader, ILoaderArr } from '../interface';
export declare class BaseLoader {
    cwd: string;
    constructor();
    generateLoader(loader: ILoader): ILoaderArr[];
    protected filesPath(loader: ILoader): ILoaderArr[];
}
