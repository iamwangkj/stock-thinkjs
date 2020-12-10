"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeST(list) {
    return list.filter((item) => {
        return !(/(ST)/.test(item.name));
    });
}
function removeKechuang(list) {
    return list.filter((item) => {
        return item.code.substring(0, 3) !== '688';
    });
}
function getRedT(list) {
    return list.filter((item) => {
        let { open, high, low, trade } = item;
        open = Number(open);
        high = Number(high);
        low = Number(low);
        trade = Number(trade);
        const divH = Math.abs(trade - open);
        const lineUpH = Math.abs(high - trade);
        const lineDownH = open - low;
        const up = (trade - open) > 0;
        return up && (lineUpH / divH) < 0.05 && (lineDownH / divH) > 2;
    });
}
function getChuangye(list) {
    return list.filter((item) => {
        return item.code[0] === '3';
    });
}
function removeLimitUp(list) {
    return list.filter((item) => {
        const { changepercent } = item;
        return Number(changepercent) < 9;
    });
}
function getLimitUp(list) {
    return list.filter((item) => {
        const { changepercent } = item;
        return Number(changepercent) > 9;
    });
}
function getBigAmount(list) {
    return list.filter((item) => {
        let { amount } = item;
        amount = Number(amount);
        return amount > 100000000;
    });
}
function getLowPrice(list, price = 50) {
    return list.filter((item) => {
        const trade = Number(item.trade);
        return trade < price;
    });
}
function getHighPrice(list, price = 10) {
    return list.filter((item) => {
        const trade = Number(item.trade);
        return trade > price;
    });
}
function getHighRatio(list, huanshoulv = 5) {
    return list.filter((item) => {
        const ratio = Number(item.turnoverratio);
        return ratio > huanshoulv;
    });
}
exports.default = {
    removeST,
    removeKechuang,
    getRedT,
    getChuangye,
    removeLimitUp,
    getLimitUp,
    getBigAmount,
    getLowPrice,
    getHighPrice,
    getHighRatio
};
//# sourceMappingURL=filter.js.map