import next from 'next'
import path from 'path'

export async function createClient() {
  const client = next({
    dev: process.env.NODE_ENV !== 'production',
    dir: path.resolve('./src/client'),
    conf: require('./next.config.js'),
  })

  const render = client.getRequestHandler()

  await client.prepare()

  return {
    render,
  }
}
