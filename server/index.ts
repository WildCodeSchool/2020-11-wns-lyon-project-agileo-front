import { App } from './controllers/App'
import { apiRouter } from './routes'
import * as fs from 'fs'

App.initialize().then(async () => {
  const models = fs.readdirSync('./server/models')

  for (const model of models.filter((m) => m.endsWith('.ts'))) {
    await import(`./models/${model}`)
  }

  App.express.use(apiRouter)
  App.start()
})

process.on('SIGINT', () => {
  console.info('Caught interrupt signal')
  process.exit()
})

process.on('SIGTERM', () => {
  console.info('Caught interrupt signal')
  process.exit()
})
