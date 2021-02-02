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
  public static Appexpress
  public static next

  public static async initialize() {
    const keystone = new Keystone({
      name: 'Agileo',
      adapter: new MongooseAdapter({
        mongoUri: 'mongodb://127.0.0.1:27017/agileo',
      }),
      cookieSecret: 'supersecret',
    })

    this.Appexpress = express()
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
    this.Appexpress.use(middlewares)
    this.Appexpress.all('*', (req, res) => this.next.getRequestHandler()(req, res))
    const port = process.env.PORT || 3000
    const server = http.Server(this.Appexpress)
    const io = require('socket.io')(server, { cors: { origin: '*', } });
    server.listen(port)
    io.on('connection', () => { console.log(`🧦)  Socket is running on port ${port}`)});
    console.log(`🚀 Server is running on port ${port}`)
    console.log(`🤖 API available on http://localhost:${port}/api`)
    console.log(`📈 Admin client http://localhost:${port}/admin`)
  }
}