module.exports = [
  // {
  //   interval: '10s',
  //   immediate: true,
  //   handle: () => {
  //   // do something
  //   }
  // },
  {
    cron: '0 15 * * *',
    handle: 'crontab/allStock',
    type: 'one'
  }
]
