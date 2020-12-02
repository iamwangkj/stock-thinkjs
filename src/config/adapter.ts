import 'thinkjs3-ts'
import path from 'path'
import nunjucks from 'think-view-nunjucks'
import fileSession from 'think-session-file'
import fileCache from 'think-cache-file'
import mysql from 'think-model-mysql'

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
  type: 'mysql', // 默认使用的类型，调用时可以指定参数切换
  common: { // 通用配置
    logConnect: true, // 是否打印数据库连接信息
    logSql: true, // 是否打印 SQL 语句
    logger: msg => think.logger.info(msg) // 打印信息的 logger
  },
  mysql: { // mysql 配置
    handle: mysql,
    database: 'stock',
    prefix: '',
    encoding: 'utf8mb4',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '12345678',
    connectionLimit: 10,
    dateStrings: true,
    charset: 'utf8mb4'
  },
  mysql2: { // 另一个 mysql 的配置
    handle: mysql
  },
  sqlite: { // sqlite 配置

  },
  postgresql: { // postgresql 配置

  }
}
