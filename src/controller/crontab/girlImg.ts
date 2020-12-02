import baseController from '../base'
import axios from 'axios'
import cheerio from 'cheerio'

export default class extends baseController {
  async saveAction () {
    try {
      const resList = [] // 存放结果的数组
      const url = 'https://www.mzitu.com/zipai/'
      const res = await axios.get(url)
      const $ = cheerio.load(res.data)
      $('.comment .comment-body').each((index, el) => {
        const date = $(el).find('.comment-meta a').text()
        const imgUrl = $(el).find('p img.lazy').attr('data-original')
        console.log('=', date, imgUrl)
        const item = { date, imgUrl }
        resList.push(item)
      })
      // const model = this.model('policy_for_gwy')
      // let row = 0
      // let isEnd = false
      // let i = 0
      // while (!isEnd) {
      //   const item = resList[i]
      //   const { title, url } = item
      //   const data = await model.where({ title }).find()
      //   if (think.isEmpty(data)) { // 如果数据库中没有找到该政策，即保存
      //     row = row + 1
      //     console.log('数据库中没有该政策=', i)
      //     await model.add({ title, url })
      //     // 发通知，有新的政策发布了
      //   }
      //   i < resList.length - 1 ? ++i : isEnd = true
      // }
      // return this.success(null, `insert ${row} row`)
    } catch (error) {
      // return this.fail(-1, error.message)
    }
  }
}
