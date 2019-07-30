"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseLoader_1 = require("./baseLoader");
class ModelLoader extends baseLoader_1.BaseLoader {
    constructor() {
        super();
    }
    get() {
        return this.generateLoader('model');
    }
}
exports.ModelLoader = ModelLoader;
//# sourceMappingURL=modelLoader.js.map