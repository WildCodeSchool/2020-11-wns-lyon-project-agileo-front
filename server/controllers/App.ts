import { Keystone } from '@keystonejs/keystone'
import { PasswordAuthStrategy } from '@keystonejs/auth-password'
import { GraphQLApp } from '@keystonejs/app-graphql'
import { AdminUIApp } from '@keystonejs/app-admin-ui'
import { MongooseAdapter } from '@keystonejs/adapter-mongoose'
const express = require('express');
const http = require('http');
const dev = process.env.NODE_ENV !== 'production'
const next = require('next')

export class App {
  public static keystone
  public static express
  public static next

  public static async initialize() {
    const keystone = new Keystone({
      name: 'Agileo',
      adapter: new MongooseAdapter({
        mongoUri: 'mongodb://127.0.0.1:27017/agileo',
      }),
      cookieSecret: 'supersecret',
    })

    this.express = express()
    this.keystone = keystone
    this.next = next({ dev })
  }

  public static async start() {
    const authStrategy = this.keystone.createAuthStrategy({
      type: PasswordAuthStrategy,
      list: 'User',
    })

    const { middlewares } = await this.keystone.prepare({
      apps: [new GraphQLApp(), new AdminUIApp({ authStrategy })],
      dev,
    })
    await this.keystone.connect()
    await this.next.prepare()
    this.express.use(middlewares)
    this.express.all('*', (req, res) => this.next.getRequestHandler()(req, res))
    const server = http.Server(this.express)
    const io = require('socket.io')(server, { cors: { origin: '*' } })
    server.listen(3000)
    io.on('connection', () => {
      console.log('🧦 Socket is running on port 3000')
    })
    console.log('🚀 Server is running on port 3000')
  }
}