"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
const camelcase = require('camelcase');
class BaseLoader {
    constructor() {
        this.cwd = process.cwd();
    }
    generateLoader(loader) {
        // todo
        return this.filesPath(loader);
    }
    filesPath(loader) {
        const files = glob.sync(`${this.cwd}/src/${loader}/**/*`);
        const loaders = [];
        files.forEach(file => {
            const fileLoader = require(file);
            Object.keys(fileLoader).map(key => {
                loaders.push({
                    key: camelcase(key),
                    value: fileLoader[key],
                });
            });
        });
        return loaders;
    }
}
exports.BaseLoader = BaseLoader;
//# sourceMappingURL=baseLoader.js.map