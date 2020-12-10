import Base from './base'
import dayjs from 'dayjs'
import stockSDK from '../lib/stockSDK/index'

export default class extends Base {
  async redtAction () {
    try {
      const date = this.get('date')
      const list = await this.getAllStock(date)
      let res = stockSDK.filter.getBigAmount(list)
      res = stockSDK.filter.removeST(list)
      res = stockSDK.filter.getRedT(list)
      return this.success(res, 'ok')
    } catch (err) {
      return this.fail(err.errno, err.message)
    }
  }

  async getAllAction () {
    try {
      const date = this.get('date')
      const data = await this.getAllStock(date)
      return this.success(data, 'ok')
    } catch (err) {
      return this.fail(err.errno, err.message)
    }
  }

  async getAction () {
    try {
      const date = this.get('date')
      const code = this.get('code')
      const model = this.mongo('stock_history')
      const data = await model.where({ date, code }).find()
      return this.success(data, 'ok')
    } catch (err) {
      return this.fail(err.errno, err.message)
    }
  }

  async getAllStock (date = dayjs().format('YYYY-MM-DD')) {
    const model = this.mongo('stock_history')
    const data = await model.where({ date }).select()
    return data
  }
}
