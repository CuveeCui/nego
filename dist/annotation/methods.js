"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const constants_1 = require("../helper/constants");
function methodFactory(method, path) {
    return (target, key) => {
        Reflect.defineMetadata(constants_1.ME_KEY, { method, path, key }, target, key);
    };
}
exports.methodFactory = methodFactory;
function get(path) {
    return methodFactory(constants_1.METHODS_GET, path);
}
exports.get = get;
function put(path) {
    return methodFactory(constants_1.METHODS_PUT, path);
}
exports.put = put;
function post(path) {
    return methodFactory(constants_1.METHODS_POST, path);
}
exports.post = post;
function del(path) {
    return methodFactory(constants_1.METHODS_DELETE, path);
}
exports.del = del;
