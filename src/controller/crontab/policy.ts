import baseController from '../base'
import axios from 'axios'
import cheerio from 'cheerio'

export default class extends baseController {
  async saveAction () {
    try {
      const resList = [] // 存放结果的数组
      const url = 'http://www.gov.cn/zhengce/index.htm'
      const res = await axios.get(url)
      const $ = cheerio.load(res.data)
      $('.latestPolicy_left_item a').each((index, el) => {
        const title = $(el).text()
        const url = $(el).attr('href')
        const item = {
          title,
          url: /http|https/.test(url) ? url : `http://www.gov.cn${url}`
        }
        resList.push(item)
      })
      const model = this.model('policy_for_gwy')
      let row = 0
      let isEnd = false
      let i = 0
      while (!isEnd) {
        const item = resList[i]
        const { title, url } = item
        const data = await model.where({ title }).find()
        if (think.isEmpty(data)) { // 如果数据库中没有找到该政策，即保存
          row = row + 1
          console.log('数据库中没有该政策=', i)
          await model.add({ title, url })
          // 发通知，有新的政策发布了
        }
        i < resList.length - 1 ? ++i : isEnd = true
      }
      return this.success(null, `insert ${row} row`)
    } catch (error) {
      // return this.fail(-1, error.message)
    }
  }
}
