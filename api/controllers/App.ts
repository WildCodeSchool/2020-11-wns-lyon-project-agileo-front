require('dotenv').config()
import { Keystone } from '@keystonejs/keystone'
import { PasswordAuthStrategy } from '@keystonejs/auth-password'
import { GraphQLApp } from '@keystonejs/app-graphql'
import { AdminUIApp } from '@keystonejs/app-admin-ui'
import { MongooseAdapter } from '@keystonejs/adapter-mongoose'
import express from 'express'

export class App {
  public static keystone
  public static app

  public static async initialize() {
    const keystone = new Keystone({
      adapter: new MongooseAdapter({ mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/agileo' }),
      cookieSecret: 'supersecret',
    })

    this.app = express()
    this.keystone = keystone
  }

  public static async start() {
    const authStrategy = this.keystone.createAuthStrategy({
      type: PasswordAuthStrategy,
      list: 'User',
    })

    const adminUiApp = new AdminUIApp({
      authStrategy: process.env.DISABLE_AUTH === 'true' ? undefined : authStrategy,
      apiPath: '/api',
    })

    const graphQlApp = new GraphQLApp({
      authStrategy: [authStrategy],
      apiPath: '/api',
      graphiqlPath: '/admin/graphiql',
    })

    const { middlewares } = await this.keystone.prepare({
      apps: [graphQlApp, adminUiApp],
      dev: process.env.NODE_ENV !== 'production',
    })

    await this.keystone.connect()
    this.app.use(middlewares)
    this.app.listen(5000)
    console.info('\x1b[36m%s\x1b[0m', 'ready', `- started server on http://localhost:5000`)
  }
}
