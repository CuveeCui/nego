"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KoaLogger = require("koa-logger");
const KoaBodyParser = require("koa-bodyparser");
const KoaCors = require("koa-cors");
// TODO introduce koa-jwt koa-session
exports.mid = (app) => {
    app
        .use(KoaLogger())
        .use(KoaBodyParser())
        .use(KoaCors({
        origin: '*',
    }));
};
