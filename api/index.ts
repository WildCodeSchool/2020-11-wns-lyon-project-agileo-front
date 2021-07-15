require('dotenv').config()
const _ = require("lodash");
import { Keystone } from '@keystonejs/keystone'
import { PasswordAuthStrategy } from '@keystonejs/auth-password'
import { GraphQLApp } from '@keystonejs/app-graphql'
import { AdminUIApp } from '@keystonejs/app-admin-ui'
import { MongooseAdapter } from '@keystonejs/adapter-mongoose'
import { Router } from './routes'
import chalk from 'chalk';
import express from 'express'
import fs from 'fs'
const { users, onUserConnect, getExistingMessages, onChatReceived } =require('./socket')
const http = require('http')



let websocket;

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
    let server = http.Server(this.express)
    websocket = require('socket.io')(server, { cors: { origin: '*' } })
    this.keystone.connect()
    this.express.use(middlewares)
    let port = 4000
    server.listen(4000)
    console.log('port listen on ', port)


    websocket.on('connection', (socket) => {

      socket.on('current_user', async (user) => await onUserConnect(user, socket));
      socket.on("get_messages", (messages) => getExistingMessages(messages, socket))
      socket.on('send_message', (message) => onChatReceived(message, socket));

      console.log(chalk.magenta('Users connected' + JSON.stringify(Object.values(users))))

      socket.on('disconnected', function (user) {
        console.log(chalk.red('User ' + user.id + ' disconnected'))
        delete users[user.id]
        websocket.emit("onlineUsers", users);
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
