export default [{
  interval: '3s',
  immediate: true,
  handle: () => {
    // do something
    // console.log('test crontab interval', )
  }
}, {
  // 分 时 日 月 周
  cron: '1/* * * * *', // 每小时执行一次
  handle: 'crontab/policy/save',
  type: 'all'
}, {
  cron: '0 15 * * *',
  handle: 'crontab/stock/saveAll',
  type: 'all'
}]
