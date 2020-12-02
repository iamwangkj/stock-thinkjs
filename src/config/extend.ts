import view from 'think-view'
import cache from 'think-cache'
import session from 'think-session'
import model from 'think-model'

export = [
  view,
  cache,
  session,
  model(think.app)
];
