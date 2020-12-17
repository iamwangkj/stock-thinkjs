import Base from './base'

export default class extends Base {
  async getAllAction () {
    try {
      const model_zipai = this.mongo('girl_img')
      const model_street = this.mongo('girl_street')
      const data_zipai = await model_zipai.select()
      const data_street = await model_street.select()
      const res = data_zipai.concat(data_street)
      console.log(`自拍张数=${data_zipai.length}`, `街拍张数=${data_street.length}`, `总张数=${res.length}`)
      return this.success(res, 'ok')
    } catch (err) {
      return this.fail(-1, err.message)
    }
  }
}
