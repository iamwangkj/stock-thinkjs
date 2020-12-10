"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../base"));
const stockSDK_1 = __importDefault(require("../../lib/stockSDK"));
const dayjs_1 = __importDefault(require("dayjs"));
const axios_1 = __importDefault(require("axios"));
class default_1 extends base_1.default {
    __before() {
    }
    chunk(arr, size = 10) {
        const res = Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
        return res;
    }
    async saveTodayAllAction() {
        try {
            const today = dayjs_1.default().format('YYYY-MM-DD');
            const { data } = await axios_1.default.get(`http://tool.bitefu.net/jiari/?d=${today}`);
            const isOpen = data === 0;
            if (!isOpen) {
                throw (Error('stock is not open today'));
            }
            const allList = await stockSDK_1.default.collector.getTodayAll();
            const model_stock_history = this.mongo('stock_history');
            const insertList = allList.map((item) => {
                const { code, name, open, high, low, trade, volume, amount, per, pb, mktcap, nmc, turnoverratio } = item;
                return {
                    date: dayjs_1.default().format('YYYY-MM-DD'),
                    code,
                    name,
                    open,
                    high,
                    low,
                    trade,
                    volume,
                    amount,
                    pe_ratio: per,
                    pb,
                    market_cap: mktcap,
                    nmc,
                    turn_over_ratio: turnoverratio
                };
            });
            const resList = this.chunk(insertList, 20);
            resList.forEach(async (itemList) => {
                await model_stock_history.addMany(itemList);
            });
            return this.success(null, `insert ${insertList.length} row`);
        }
        catch (error) {
            return this.fail(-1, error.message);
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=stock.js.map