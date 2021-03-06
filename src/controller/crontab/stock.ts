import baseController from '../base'
import stockSDK from '../../lib/stockSDK'
import dayjs from 'dayjs'
import axios from 'axios'

export default class extends baseController {
  __before () {
    // if (!this.isCli) return this.fail(-1, '不是内部调用')
  }

  // 对数据分块，方便多条插入数据库。数据库多条插入上限20
  chunk (arr:Array<any>, size:number = 10) {
    const res = Array.from(
      { length: Math.ceil(arr.length / size) },
      (v, i) => arr.slice(i * size, i * size + size)
    )
    return res
  }

  // 保存今日所有数据到数据库
  async saveTodayAllAction () {
    try {
      const today = dayjs().format('YYYY-MM-DD')
      const { data } = await axios.get(`http://tool.bitefu.net/jiari/?d=${today}`)
      const isOpen = data === 0 // 今日是否开市
      if (!isOpen) {
        throw (Error('stock is not open today'))
      }
      const allList = await stockSDK.collector.getTodayAll()
      const model_stock_history = this.mongo('stock_history')
      const insertList = allList.map((item) => {
        const { code, name, open, high, low, trade, volume, amount, per, pb, mktcap, nmc, turnoverratio } = item
        return {
          date: dayjs().format('YYYY-MM-DD'),
          code,
          name,
          open,
          high,
          low,
          trade,
          volume,
          amount,
          pe_ratio: per,
          pb,
          market_cap: mktcap,
          nmc,
          turn_over_ratio: turnoverratio
        }
      })
      const resList = this.chunk(insertList, 20)
      resList.forEach(async (itemList) => {
        await model_stock_history.addMany(itemList)
      })
      return this.success(null, `insert ${insertList.length} row`)
    } catch (error) {
      return this.fail(-1, error.message)
    }
  }
}
