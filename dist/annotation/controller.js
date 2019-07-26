"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const constants_1 = require("../helper/constants");
function controller(identifier) {
    return (target) => {
        if (!identifier) {
            // tslint:disable-next-line: no-parameter-reassignment
            identifier = '';
        }
        Reflect.defineMetadata(constants_1.CTR_KEY, identifier, target);
        return target;
    };
}
exports.controller = controller;
