// 移除ST
function removeST (list) {
  return list.filter((item) => {
    return !(/(ST)/.test(item.name))
  })
}

// 移除科创股，因为我还没法买
function removeKechuang (list) {
  return list.filter((item) => {
    return item.code.substring(0, 3) !== '688'
  })
}

// 红T
function getRedT (list) {
  return list.filter((item) => {
    let { open, high, low, trade, changepercent } = item
    changepercent = Number(changepercent)
    open = Number(open)
    high = Number(high)
    low = Number(low)
    trade = Number(trade)
    const divH = Math.abs(trade - open)
    const lineUpH = Math.abs(high - trade)
    const lineDownH = open - low
    return changepercent > 0 && (lineUpH / divH) < 0.05 && (lineDownH / divH) > 2
  })
}

// 获取创业股
function getChuangye (list) {
  return list.filter((item) => {
    return item.code[0] === '3'
  })
}

// 移除涨停
function removeLimitUp (list) {
  return list.filter((item) => {
    const { changepercent } = item
    return Number(changepercent) < 9
  })
}

// 筛选出涨停
function getLimitUp (list) {
  return list.filter((item) => {
    const { changepercent } = item
    return Number(changepercent) > 9
  })
}

// 筛选出大于1亿金额的股票
function getBigAmount (list) {
  return list.filter((item) => {
    let { amount } = item
    amount = Number(amount)
    return amount > 100000000
  })
}

// 筛选出价格低于50的股票
function getLowPrice (list, price = 50) {
  return list.filter((item) => {
    const trade = Number(item.trade)
    return trade < price
  })
}

// 筛选出价格高于10的股票
function getHighPrice (list, price = 10) {
  return list.filter((item) => {
    const trade = Number(item.trade)
    return trade > price
  })
}

// 筛选出高换手率的股票
function getHighRatio (list, huanshoulv = 5) {
  return list.filter((item) => {
    const ratio = Number(item.turnoverratio)
    return ratio > huanshoulv
  })
}

module.exports = {
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
}
