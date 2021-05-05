require('dotenv').config()
import { Keystone } from '@keystonejs/keystone'
import { PasswordAuthStrategy } from '@keystonejs/auth-password'
import { GraphQLApp } from '@keystonejs/app-graphql'
import { AdminUIApp } from '@keystonejs/app-admin-ui'
import { MongooseAdapter } from '@keystonejs/adapter-mongoose'
import { Router } from './routes'
import express from 'express'
import fs from 'fs'
const http = require('http')

export class App {
  public static keystone
  public static express

  public static async initialize() {
    const adapter = new MongooseAdapter({ mongoUri: process.env.MONGO_URI })
    const keystone = new Keystone({ adapter: adapter, cookieSecret: 'secret' })
    this.express = express()
    this.keystone = keystone
  }


  public static async start() {
    const authStrategy = this.keystone.createAuthStrategy({ type: PasswordAuthStrategy, list: 'User' })
    const apps = [new GraphQLApp(), new AdminUIApp({ authStrategy })]
    const { middlewares } = await this.keystone.prepare({ apps: apps, dev: true })
    const server = http.Server(this.express)
    const io = require('socket.io')(server, { cors: { origin: '*' } })
    this.keystone.connect()
    this.express.use(middlewares)
    server.listen(4000)
    console.log('🚀 Server is running on port 4000')
    io.on('connection', (socket) => {
      console.log('🧦 Socket is running on port 4000')
      socket.on("chat message", msg => {
        console.log("on",msg);
        io.emit("chat message", msg);
        console.log("emit",msg);
      });
    
    })
  }
}

App.initialize().then(async () => {
  const models = fs.readdirSync('./models')
  for (const model of models.filter((m) => m.endsWith('.ts'))) await import(`./models/${model}`)
  App.express.use(Router)
  await App.start()
})
