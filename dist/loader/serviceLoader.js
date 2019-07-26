"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseLoader_1 = require("./baseLoader");
class ServiceLoader extends baseLoader_1.BaseLoader {
    constructor() {
        super();
    }
    get() {
        return this.generateLoader('service');
    }
}
exports.ServiceLoader = ServiceLoader;
