"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("./base"));
const dayjs_1 = __importDefault(require("dayjs"));
const index_1 = __importDefault(require("../lib/stockSDK/index"));
class default_1 extends base_1.default {
    async redtAction() {
        try {
            const date = this.get('date');
            const list = await this.getAllStock(date);
            let res = index_1.default.filter.getBigAmount(list);
            res = index_1.default.filter.removeST(list);
            res = index_1.default.filter.getRedT(list);
            return this.success(res, 'ok');
        }
        catch (err) {
            return this.fail(err.errno, err.message);
        }
    }
    async getAllAction() {
        try {
            const date = this.get('date');
            const data = await this.getAllStock(date);
            return this.success(data, 'ok');
        }
        catch (err) {
            return this.fail(err.errno, err.message);
        }
    }
    async getAction() {
        try {
            const date = this.get('date');
            const code = this.get('code');
            const model = this.mongo('stock_history');
            const data = await model.where({ date, code }).find();
            return this.success(data, 'ok');
        }
        catch (err) {
            return this.fail(err.errno, err.message);
        }
    }
    async getAllStock(date = dayjs_1.default().format('YYYY-MM-DD')) {
        const model = this.mongo('stock_history');
        const data = await model.where({ date }).select();
        return data;
    }
}
exports.default = default_1;
//# sourceMappingURL=stock.js.map