import baseController from '../base'
import axios from 'axios'
import cheerio from 'cheerio'
import nodemailer from 'nodemailer'

// 发送邮件函数
async function sendMail (text = '空') {
  try {
    const user = 'tone_cn@163.com'// 自己的邮箱
    const pass = 'LVXYNHGAKUVOOUVN' // qq邮箱授权码,如何获取授权码下面有讲
    const to = 'ne.wkj@qq.com'// 对方的邮箱
    const transporter = nodemailer.createTransport({
      host: 'smtp.163.com',
      port: 25,
      secure: false,
      auth: {
        user: user, // 用户账号
        pass: pass // 授权码
      }
    })
    await transporter.sendMail({
      from: `新政策爬虫<${user}>`, // sender address
      to: `<${to}>`, // list of receivers
      subject: '有新政策', // Subject line
      text: text // plain text body
    })
    console.log('邮件发送成功')
  } catch (err) {
    console.log('邮件发送失败')
  }
}

export default class extends baseController {
  async saveAction () {
    console.log('爬取政策')
    try {
      const resList = [] // 存放结果的数组
      const url = 'http://www.gov.cn/zhengce/index.htm'
      const res = await axios.get(url)
      const $ = cheerio.load(res.data)
      $('.latestPolicy_left_item').each((index, el) => {
        const a = $(el).find('a')
        const title = a.text()
        const url = a.attr('href')
        const date = $(el).find('span').text()
        const item = {
          title,
          url: /http|https/.test(url) ? url : `http://www.gov.cn${url}`,
          date
        }
        resList.push(item)
      })
      const model = this.mongo('policy_for_gwy')
      let row = 0
      let isEnd = false
      let i = 0
      while (!isEnd) {
        const item = resList[i]
        const { title, url, date } = item
        const data = await model.where({ title }).find()
        if (think.isEmpty(data)) { // 如果数据库中没有找到该政策，即保存
          row = row + 1
          console.log('数据库中没有该政策=', i)
          await model.add({ title, url, date })
          // 发通知，有新的政策发布了
          const mailContent = `时间：${date}\n标题：${title}\n链接：${url}`
          await sendMail(mailContent)
        }
        i < resList.length - 1 ? ++i : isEnd = true
      }
      console.log('插入条数', row)
      return this.success(null, `insert ${row} row`)
    } catch (error) {
      return this.fail(-1, error.message)
    }
  }
}
