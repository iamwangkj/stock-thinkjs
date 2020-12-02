import Base from './base'

export default class extends Base {
  async getAllAction () {
    try {
      const date = this.get('date')
      const model = this.model('stock_history')
      const data = await model.where({ date }).select()
      console.log('data=', data)
      return this.success(data, 'ok')
    } catch (err) {
      return this.fail(err.errno, err.message)
    }
  }

  async getAction () {
    try {
      const date = this.get('date')
      const code = this.get('code')
      const model = this.model('stock_history')
      const data = await model.where({ date, code }).find()
      return this.success(data, 'ok')
    } catch (err) {
      return this.fail(err.errno, err.message)
    }
  }
}
