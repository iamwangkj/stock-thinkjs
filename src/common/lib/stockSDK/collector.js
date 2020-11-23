const axios = require('axios')
const tushareToken = '636de5eeb64f0c7f44165b5e9f4458fbdb18faab6f7bd8aa565535c1'

// 将code转成tushare专用
function codeToSymbolForTushare (code) {
  code = String(code)
  let symbol = ''
  if (code.length === 6) {
    symbol = ['5', '6', '9'].indexOf(code.charAt(0)) >= 0 ? `${code}.SH` : `${code}.SZ`
  } else {
    symbol = code
  }
  return symbol
}

// 获取指定日期区间的历史行情，start = 'YYYYMMDD', end = 'YYYYMMDD'
async function getHistoryByDate (code, start, end) {
  const postData = {
    api_name: 'daily',
    token: tushareToken,
    params: {
      ts_code: codeToSymbolForTushare(code),
      start_date: start,
      end_date: end
    },
    fields: ''
  }
  const res = await axios.post('http://api.tushare.pro', postData)
  // console.log('接口返回', res.data.data)
  const formatList = res.data.data.items.map((item) => {
    return {
      code: String(code),
      date: item[1],
      open: Number(item[2]),
      high: Number(item[3]),
      low: Number(item[4]),
      trade: Number(item[5]),
      priceChange: Number(item[7]),
      percentChange: `${item[8].toFixed(2)}%`,
      liang: Number(item[9]),
      amount: Number(item[10])
    }
  })
  return formatList
}

// getHistoryByDate(600893, '20201109', '20201111').then((res) => {
//   console.log('getHistoryByDate()', res)
// })

// 将code转化为symbol
function codeToSymbol (code) {
  let symbol = ''
  if (code.length === 6) {
    symbol = ['5', '6', '9'].indexOf(code.charAt(0)) >= 0 ? `sh${code}` : `sz${code}`
  } else {
    symbol = code
  }
  return symbol
}

// 获取今日所有股票实时行情
async function getTodayAll () {
  let pageIndex = 1
  let isEnd = false
  let resArr = []
  while (!isEnd) {
    const url = `http://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/Market_Center.getHQNodeData?num=100&sort=changepercent&asc=0&node=hs_a&symbol=&_s_r_a=page&page=${pageIndex}`
    const res = await axios.get(url)
    const { data } = res
    console.log(`获取第${pageIndex}页stock行情，长度为${data.length}`)
    resArr = resArr.concat(data)
    data.length < 100 ? isEnd = true : pageIndex++
  }
  return resArr
}
// getTodayAll()

// 获取某只股票半年的历史行情
function getHistory (code) {
  return new Promise((resolve, reject) => {
    const symbol = codeToSymbol(code)
    const url = `http://api.finance.ifeng.com/akdaily/?code=${symbol}&type=fq`
    axios.get(url).then(({ data }) => {
      const { record } = data
      // console.log('data', data)
      if (record && record.length > 0) {
        const res = record.reverse()
        // console.log('股票历史行情，倒排序后', res)
        const newRes = res.map((item) => {
          return {
            code: String(code),
            date: item[0],
            open: Number(item[1]),
            high: Number(item[2]),
            trade: Number(item[3]),
            low: Number(item[4]),
            liang: Number(item[5]),
            priceChange: Number(item[6]),
            percentChange: `${item[7]}%`,
            averagePrice5: Number(item[8]),
            averagePrice10: Number(item[9]),
            averagePrice20: Number(item[10])
          }
        })
        resolve(newRes)
      } else {
        reject(Error(`获取${code}历史为空`))
      }
    }).catch((err) => {
      // console.error('getHistory err', err)
      reject(err)
    })
  })
}
// getHistory('300100')

module.exports = {
  getHistoryByDate,
  getTodayAll,
  getHistory
}
