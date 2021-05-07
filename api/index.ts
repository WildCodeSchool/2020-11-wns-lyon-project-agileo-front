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
var mongojs = require('mongojs');

var ObjectID = mongojs.ObjectID;
var db = mongojs(process.env.MONGO_URI || 'mongodb://localhost:27017/local');
var clients = {};
var users = {};
var chatId = 1;
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
    console.log('🧦 Socket is running on port 4000')
    console.log('---------------------------------')
    console.log('---------------------------------')
    io.on('connection', (socket) => {
      socket.on('userJoined', (userId) => onUserJoined(userId, socket));
      socket.on('chat-message', (message) => onMessageReceived(message, socket));
      console.log("oh yeah your are Connected 😀 with ID" + socket.id)
    })
  }
}

function onUserJoined(userId, socket) {
  try {
      users[socket.id] = userId;
      _sendExistingMessages(socket);
    
  } catch(err) {
    console.log(err);
  }
}

/****************** */

/* When a user sends a message in the chatroom.*/
function onMessageReceived(message, senderSocket) {
  _sendAndSaveMessage(message, senderSocket, true);
}

// Helper functions.
// Send the pre-existing messages to the user that just joined.
function _sendExistingMessages(socket) {
  var messages = db.collection('messages')
    .find({ chatId })
    .sort({ createdAt: 1 })
    .toArray((err, messages) => {
      // If there aren't any messages, then return.
      if (!messages.length) return;
      socket.emit('chat-message', messages.reverse());
    });
}

// Save the message to the db and send all sockets but the sender.
function _sendAndSaveMessage(message, socket, fromServer) {

  db.collection('messages').insert(message, (err, message) => {
    // If the message is from the server, then send to everyone.
    var emitter = fromServer ? socket : socket.broadcast;

    console.log("message")
    console.log(message)
    
    emitter.emit('chat-message', [message]);
  });
}

// Permettre l'acces au chat via la CLI en mode stdin.
var stdin = process.openStdin();
stdin.addListener('data', function (d) {
  _sendAndSaveMessage({
    text: d.toString().trim(),
    createdAt: new Date(),
    user: { _id: 'Aurelien' }
  }, null /* no socket */, true /* send from server */);
});

App.initialize().then(async () => {
  const models = fs.readdirSync('./models')
  for (const model of models.filter((m) => m.endsWith('.ts'))) await import(`./models/${model}`)
  App.express.use(Router)
  await App.start()
})
