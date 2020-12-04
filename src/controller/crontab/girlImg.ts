import baseController from '../base'
import axios from 'axios'
import cheerio from 'cheerio'

export default class extends baseController {
  // 获取每页的图片
  async getList (pageIndex) {
    // https://www.mzitu.com/zipai/comment-page-478/#comments
    const resList = [] // 存放结果的数组
    const url = `https://www.mzitu.com/zipai/comment-page-${pageIndex}/#comments`
    const res = await axios.get(url)
    const $ = cheerio.load(res.data)
    $('.comment .comment-body').each((index, el) => {
      const date = $(el).find('.comment-meta a').text().trim().replace('at ', '')
      const imgUrl = $(el).find('p img.lazy').attr('data-original')
      // console.log(imgUrl, date)
      const item = { date, imgUrl }
      resList.push(item)
    })
    return resList
  }

  sleep (ms:number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  async saveAction () {
    try {
      const url = 'https://www.mzitu.com/zipai/'
      const res = await axios.get(url)
      const $ = cheerio.load(res.data)
      const pageTotal:number = $('.pagenavi-cm .page-numbers.current').text()
      console.log('pageTotal=', pageTotal)

      const model = this.mongo('girl_street')
      let i = 1
      let isEnd = false
      while (!isEnd) {
        const list = await this.getList(i)
        const ids = await model.addMany(list)
        console.log(`当前页码=${i}，插入条数=${ids.length}`, isEnd)
        await this.sleep(3000)
        i < pageTotal ? ++i : isEnd = true
      }

      // const model = this.mongo('girl_img')
      // let row = 0
      // let isEnd = false
      // let i = 0
      // while (!isEnd) {
      //   const { title, url } = resList[i]
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
      return this.fail(-1, error.message)
    }
  }
}
