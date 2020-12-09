import 'thinkjs3-ts'
import path from 'path'
import nunjucks from 'think-view-nunjucks'
import fileSession from 'think-session-file'
import fileCache from 'think-cache-file'

const isDev = think.env === 'development'

export const cache = {
  type: 'file',
  common: {
    timeout: 24 * 60 * 60 * 1000 // millisecond
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // gc interval
  }
}

export const session = {
  type: 'file',
  common: {
    cookie: {
      name: 'thinkjs'
      // keys: ['werwer', 'werwer'],
      // signed: true
    }
  },
  file: {
    handle: fileSession,
    sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
  }
}

export const view = {
  type: 'nunjucks',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    extname: '.html'
  },
  nunjucks: {
    handle: nunjucks
  }
}

export const model = {
  type: 'mongo', // 默认使用的类型，调用时可以指定参数切换
  common: { // 通用配置
    logConnect: true, // 是否打印数据库连接信息
    logger: msg => think.logger.info(msg) // 打印信息的 logger
  },
  mongo: {
    host: '127.0.0.1',
    port: 27017,
    user: '',
    password: '',
    database: 'stock', // 数据库名称
    options: {
      // 身份验证相关
      // replicaSet: 'mgset-3074013',
      // authSource: 'admin'
    }
  }
}
