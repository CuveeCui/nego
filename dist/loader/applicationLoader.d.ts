import 'reflect-metadata';
export declare class ApplicationLoader {
    helper: any;
    mongo: any;
    kafka: any;
    redis: any;
    mysql: any;
    constructor();
    /**
     * @desc: load nego inner config
     */
    private loadResource;
    private loadHelper;
    private loadLogger;
    /**
     * @desc: load service
     */
    private loadService;
    /**
     * @desc: load plugin
     * include helper logger
     */
    private loadPlugin;
}
