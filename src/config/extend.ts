import view from 'think-view'
import cache from 'think-cache'
import session from 'think-session'
import thinkMongo from 'think-mongo'

export = [
  view,
  cache,
  session,
  thinkMongo(think.app)
];
