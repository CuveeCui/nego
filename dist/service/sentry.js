"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Raven = require('raven');
const config = require(`${process.cwd()}/config`).default;
Raven.config(config.sentry).install();
exports.default = (app) => {
    app.on('error', (err) => {
        Raven.captureException(err, (error, eventId) => {
            console.log(`sentry ${eventId} error: ${error}`);
        });
    });
};
//# sourceMappingURL=sentry.js.map