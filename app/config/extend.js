"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const think_view_1 = __importDefault(require("think-view"));
const think_cache_1 = __importDefault(require("think-cache"));
const think_session_1 = __importDefault(require("think-session"));
const think_mongo_1 = __importDefault(require("think-mongo"));
module.exports = [
    think_view_1.default,
    think_cache_1.default,
    think_session_1.default,
    think_mongo_1.default(think.app)
];
//# sourceMappingURL=extend.js.map