"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = exports.view = exports.session = exports.cache = exports.logger = void 0;
require("thinkjs3-ts");
const path_1 = __importDefault(require("path"));
const think_view_nunjucks_1 = __importDefault(require("think-view-nunjucks"));
const think_session_file_1 = __importDefault(require("think-session-file"));
const think_cache_file_1 = __importDefault(require("think-cache-file"));
exports.logger = {
    type: 'dateFile',
    dateFile: {
        handle: DateFile,
        level: 'ALL',
        absolute: true,
        pattern: '-yyyy-MM-dd',
        alwaysIncludePattern: true,
        filename: path_1.default.join(think.ROOT_PATH, 'logs/stock-thinkjs.log')
    }
};
exports.cache = {
    type: 'file',
    common: {
        timeout: 24 * 60 * 60 * 1000
    },
    file: {
        handle: think_cache_file_1.default,
        cachePath: path_1.default.join(think.ROOT_PATH, 'runtime/cache'),
        pathDepth: 1,
        gcInterval: 24 * 60 * 60 * 1000
    }
};
exports.session = {
    type: 'file',
    common: {
        cookie: {
            name: 'thinkjs'
        }
    },
    file: {
        handle: think_session_file_1.default,
        sessionPath: path_1.default.join(think.ROOT_PATH, 'runtime/session')
    }
};
exports.view = {
    type: 'nunjucks',
    common: {
        viewPath: path_1.default.join(think.ROOT_PATH, 'view'),
        sep: '_',
        extname: '.html'
    },
    nunjucks: {
        handle: think_view_nunjucks_1.default
    }
};
exports.model = {
    type: 'mongo',
    common: {
        logConnect: true,
        logger: msg => think.logger.info(msg)
    },
    mongo: {
        host: '127.0.0.1',
        port: 27017,
        user: '',
        password: '',
        database: 'stock',
        options: {}
    }
};
//# sourceMappingURL=adapter.js.map