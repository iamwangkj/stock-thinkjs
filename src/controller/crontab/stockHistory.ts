import baseController from '../base'
import stockSDK from '../../lib/stockSDK'
import dayjs from 'dayjs'

export default class extends baseController {
  chunk (arr:Array<any>, size:number = 10) {
    const res = Array.from(
      { length: Math.ceil(arr.length / size) },
      (v, i) => arr.slice(i * size, i * size + size)
    )
    return res
  }

  async getAllAction () {
    try {
      const allList = await stockSDK.collector.getTodayAll()
      const model_stock_history = this.model('stock_history')
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
