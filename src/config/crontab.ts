export default [{
  interval: '3s',
  immediate: true,
  handle: () => {
    // do something
    // console.log('test crontab interval', )
  }
}, {
  // 分 时 日 月 周
  cron: '0 15 * * *',
  handle: 'crontab/stock/saveTodayAll',
  type: 'all'
}, {
  // 分 时 日 月 周
  cron: '*/30 * * * *', // 每小时执行一次
  handle: 'crontab/policy/save',
  type: 'all'
}]
