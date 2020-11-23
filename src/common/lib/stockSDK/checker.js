// 检验涨跌比
function check (list) {
  const upList = []
  const downList = []
  list.forEach((item) => {
    const { code, buy, sale } = item
    const changePercent = ((sale.trade - buy.trade) / buy.trade * 100).toFixed(2)
    if (changePercent > 0) {
      console.log('涨', code, `${changePercent}%`)
      upList.push(item)
    } else {
      console.log('跌', code, `${changePercent}%`)
      downList.push(item)
    }
  })
  console.log(`总(${list.length})，涨跌比(${upList.length}:${downList.length})`)
}

module.exports = {
  check
}
