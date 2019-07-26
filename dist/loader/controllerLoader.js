"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseLoader_1 = require("./baseLoader");
class ControllerLoader extends baseLoader_1.BaseLoader {
    constructor() {
        super();
    }
    get() {
        return this.generateLoader('controller');
    }
}
exports.ControllerLoader = ControllerLoader;
