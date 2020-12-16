"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../base"));
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
class default_1 extends base_1.default {
    async getList(pageIndex) {
        const resList = [];
        const url = `https://www.mzitu.com/zipai/comment-page-${pageIndex}/#comments`;
        const res = await axios_1.default.get(url);
        const $ = cheerio_1.default.load(res.data);
        $('.comment .comment-body').each((index, el) => {
            const date = $(el).find('.comment-meta a').text().trim().replace('at ', '');
            const imgUrl = $(el).find('p img.lazy').attr('data-original');
            const item = { date, imgUrl };
            resList.push(item);
        });
        return resList;
    }
    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    async saveAction() {
        try {
            const url = 'https://www.mzitu.com/zipai/';
            const res = await axios_1.default.get(url);
            const $ = cheerio_1.default.load(res.data);
            const pageTotal = $('.pagenavi-cm .page-numbers.current').text();
            console.log('pageTotal=', pageTotal);
            const model = this.mongo('girl_zipai');
            let i = 1;
            let isEnd = false;
            while (!isEnd) {
                const list = await this.getList(i);
                const ids = await model.addMany(list);
                console.log(`当前页码=${i}，插入条数=${ids.length}`, isEnd);
                await this.sleep(3000);
                i < pageTotal ? ++i : isEnd = true;
            }
            return false;
        }
        catch (error) {
            return this.fail(-1, error.message);
        }
    }
}
exports.default = default_1;
