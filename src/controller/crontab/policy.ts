import baseController from '../base'
import axios from 'axios'
import cheerio from 'cheerio'
import nodemailer from 'nodemailer'

// 发送邮件函数
async function sendMail (list = []) {
  try {
    // 要发送的内容
    let html = ''
    list.forEach((item) => {
      const { title, url, date } = item
      html += `<p>（${date}）<a href="${url}">${title}</a></p>`
    })

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
      html: html // plain text body
    })
    console.log('邮件发送成功')
  } catch (err) {
    console.log('邮件发送失败')
  }
}

export default class extends baseController {
  async saveAction () {
    console.log('开始爬取政策')
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
      let isEnd = false
      let i = 0
      const newPolicyList = []
      while (!isEnd) {
        const item = resList[i]
        const { title, url, date } = item
        const data = await model.where({ title, url, date }).find()
        if (think.isEmpty(data)) { // 如果数据库中没有找到该政策，即保存
          newPolicyList.push(item)
        }
        i < resList.length - 1 ? ++i : isEnd = true
      }

      const newLen = newPolicyList.length
      console.log('新的政策条数', newLen)
      if (newLen > 0) {
        // 有新的政策发布了，插入数据库并发通知
        await model.addMany(newPolicyList)
        await sendMail(newPolicyList)
      }
      return this.success(null, `insert ${newLen} row`)
    } catch (err) {
      return this.fail(-1, err.message)
    }
  }
}
