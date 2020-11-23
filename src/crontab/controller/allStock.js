const Base = require('./base.js')
const stockSDK = require('../../common/lib/stockSDK')

module.exports = class extends Base {
  async indexAction () {
    try {
      const allList = await stockSDK.collector.getTodayAll()
      const model_stock_history = this.model('stock_history')
      const insertList = allList.map((item) => {
        const { code, name, open, high, low, trade, volume, amount, per, pb, mktcap, nmc, turnoverratio } = item
        return {
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
      const insertIds = await model_stock_history.addMany(insertList)
      return this.success(insertIds, 'insert ok')
    } catch (error) {
      return this.fail(-1, error)
    }
  }
}
