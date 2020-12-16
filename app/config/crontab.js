"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [{
        interval: '3s',
        immediate: true,
        handle: () => {
        }
    }, {
        cron: '0 15 * * *',
        handle: 'crontab/stock/saveTodayAll',
        type: 'all'
    }, {
        cron: '0,30 * * * *',
        handle: 'crontab/policy/save',
        type: 'all'
    }];
