require('dotenv').config()
import { Keystone } from '@keystonejs/keystone'
import { PasswordAuthStrategy } from '@keystonejs/auth-password'
import { GraphQLApp } from '@keystonejs/app-graphql'
import { AdminUIApp } from '@keystonejs/app-admin-ui'
import { MongooseAdapter } from '@keystonejs/adapter-mongoose'
const dev = process.env.NODE_ENV !== 'production'
const express = require('express')
const next = require('next')
const port = 3000

export class App {
  public static keystone
  public static server
  public static app

  public static async initialize() {
    const keystone = new Keystone({
      adapter: new MongooseAdapter({ mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/agileo' }),
      cookieSecret: 'supersecret',
    })

    this.server = express()
    this.keystone = keystone
    this.app = next({ dev })
  }

  public static async start() {
    const authStrategy = this.keystone.createAuthStrategy({
      type: PasswordAuthStrategy,
      list: 'User',
    })

    const { middlewares } = await this.keystone.prepare({
      apps: [new GraphQLApp(), new AdminUIApp(!dev && authStrategy)],
      dev: dev,
    })

    await this.keystone.connect()
    await this.app.prepare()
    this.server.use(middlewares)
    this.server.all('*', (req, res) => this.app.getRequestHandler()(req, res))
    this.server.listen(port)
    console.info('\x1b[36m%s\x1b[0m', 'ready', `- started server on http://localhost:${port}`)
  }
}
