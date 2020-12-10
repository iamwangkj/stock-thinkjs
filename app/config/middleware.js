"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require("thinkjs3-ts");
const path_1 = __importDefault(require("path"));
const isDev = think.env === 'development';
module.exports = [
    {
        handle: 'meta',
        options: {
            logRequest: isDev,
            sendResponseTime: isDev
        }
    },
    {
        handle: 'resource',
        enable: isDev,
        options: {
            root: path_1.default.join(think.ROOT_PATH, 'www'),
            publicPath: /^\/(static|favicon\.ico)/
        }
    },
    {
        handle: 'trace',
        enable: !think.isCli,
        options: {
            debug: isDev
        }
    },
    {
        handle: 'payload',
        options: {
            uploadDir: path_1.default.join(think.RUNTIME_PATH, '_tmp'),
            keepExtensions: true,
            limit: '5mb'
        }
    },
    {
        handle: 'router',
        options: {}
    },
    'logic',
    'controller'
];
//# sourceMappingURL=middleware.js.map