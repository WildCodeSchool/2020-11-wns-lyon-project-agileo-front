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
const http = require('http')
let mongojs = require('mongojs');

let db = mongojs(process.env.MONGO_URI || 'localhost:27017/local');

let users = {};


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

      socket.on('current_user', (user) => onUserConnect(user, socket));
      socket.on('send_message', (message) => onMessageReceived(message, socket));
      socket.on("get_messages", (messages) => getExistingMessages(messages, socket))

      console.log(chalk.magenta('Users connected' + JSON.stringify(Object.values(users))))

      /****************************/
      //disconnect and remove currentuser from users list
      socket.on('disconnected', function (user) {
        console.log(chalk.red('User ' + user.id + ' disconnected'))
        delete users[user.id]
        websocket.emit("onlineUsers", users);
      });
    })
  }
}



/* When a user sends a message in the chatroom.*/
const onMessageReceived = (message, senderSocket) => {
  _sendAndSaveMessage(message, senderSocket);

}

const onUserConnect = async (user, socket) => {
  try {
    users[user.id] = user.email;
    socket.emit("onlineUsers", users);
  } catch (err) {
    console.error({ message: 'erreur coté back', err });
  }
}

const getExistingMessages = async (message, socket) => {
  console.log(message)
  /* let query = {
    $or: [
      {$or:[
        {"receiver.email":message.receiver},
        {"sender.email":message.sender}
    ]},
    {$or:[
      {"receiver.email":message.sender},
      {"sender.email":message.receiver}
    ]}
    ]
  } */
  let query = {
    
    $or: [{
      "sender.email": message.sender,
      "receiver.email": message.receiver
    }, {
      "sender.email": message.receiver,
      "receiver.email": message.sender
    }]
  }


  const msg = await db.collection('messages')
    .find(query)
    .toArray((err, text) => {
      socket.emit('get_messages', text);
      console.log(text)
    });
}


function _sendAndSaveMessage(message, socket) {

  let messageData = {
    text: message.text,
    sender: message.from,
    receiver: message.to,
    createdAt: new Date(),
    user: message.from
  };

  db.collection('messages').insert(messageData, (err, message) => {
    socket.emit('send_message', message);
  });
}



App.initialize().then(async () => {
  const models = fs.readdirSync('./models')
  for (const model of models.filter((m) => m.endsWith('.ts'))) await import(`./models/${model}`)
  App.express.use(Router)
  await App.start()
})
