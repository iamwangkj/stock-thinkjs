"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../base"));
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const nodemailer_1 = __importDefault(require("nodemailer"));
async function sendMail(list = []) {
    try {
        let html = '';
        list.forEach((item) => {
            const { title, url, date } = item;
            html += `<p>（${date}）<a href="${url}">${title}</a></p>`;
        });
        const user = 'tone_cn@163.com';
        const pass = 'LVXYNHGAKUVOOUVN';
        const to = 'ne.wkj@qq.com';
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.163.com',
            port: 25,
            secure: false,
            auth: {
                user: user,
                pass: pass
            }
        });
        await transporter.sendMail({
            from: `新政策爬虫<${user}>`,
            to: `<${to}>`,
            subject: '有新政策',
            html: html
        });
        console.log('邮件发送成功');
    }
    catch (err) {
        console.log('邮件发送失败');
    }
}
class default_1 extends base_1.default {
    async saveAction() {
        console.log('开始爬取政策');
        try {
            const resList = [];
            const url = 'http://www.gov.cn/zhengce/index.htm';
            const res = await axios_1.default.get(url);
            const $ = cheerio_1.default.load(res.data);
            $('.latestPolicy_left_item').each((index, el) => {
                const a = $(el).find('a');
                const title = a.text();
                const url = a.attr('href');
                const date = $(el).find('span').text();
                const item = {
                    title,
                    url: /http|https/.test(url) ? url : `http://www.gov.cn${url}`,
                    date
                };
                resList.push(item);
            });
            const model = this.mongo('policy_for_gwy');
            let isEnd = false;
            let i = 0;
            const newPolicyList = [];
            while (!isEnd) {
                const item = resList[i];
                const { title, url, date } = item;
                const data = await model.where({ title, url, date }).find();
                if (think.isEmpty(data)) {
                    newPolicyList.push(item);
                }
                i < resList.length - 1 ? ++i : isEnd = true;
            }
            const newLen = newPolicyList.length;
            console.log('新的政策条数', newLen);
            if (newLen > 0) {
                await model.addMany(newPolicyList);
                await sendMail(newPolicyList);
            }
            return this.success(null, `insert ${newLen} row`);
        }
        catch (err) {
            return this.fail(-1, err.message);
        }
    }
}
exports.default = default_1;
