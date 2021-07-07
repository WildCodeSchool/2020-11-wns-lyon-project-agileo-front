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
var db = mongojs(process.env.MONGO_URI || 'localhost:27017/local');
var clients = {};
var users = {};
var chatId = 1;

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
    console.log('port listen on ',port)
    
    websocket.on('connection', (socket) => {

      console.log("oh yeah your are Connected");
      //l'utilisateur qui rejoins l'appli
      socket.on('userJoined', (userId) => onUserJoined(userId, socket));

      // message recu 
      socket.on('chat_message', (message) => onMessageReceived(message, socket));

    })
  }
}

// Event listeners.
// When a user joins the chatroom.
function onUserJoined(userId, socket) {

  console.log('utilisateur en cours' + ' ' + userId.firstName)
  try {
      users[socket.id] = userId;
      _sendExistingMessages(socket, userId);

  } catch (err) {
    console.log(err);
  }
}

const getOnlineUsers = () => {
  let clients = websocket.sockets.clients().connected;
  let sockets = Object.values(clients);
  let users = sockets.map(s => s);
  return users.filter(u => u != undefined);
};


/* When a user sends a message in the chatroom.*/
function onMessageReceived(message, senderSocket) {
  _sendAndSaveMessage(message, senderSocket, true);
}


// Récuperer les messages du user en cours sil y en a...
const _sendExistingMessages = async (socket, userId) => {
  
  const msg = await db.collection('messages')
  .find({ chatId })
  .sort({ "createdAt": 1 })
  .toArray((err, text) => {
    if (!text.length) return;
    socket.emit('chat_message', text);
  });

}

// Save the message to the db and send all sockets but the sender.
function _sendAndSaveMessage(message, socket, fromServer) {
  var messageData = {
    text: message.text,
    user: message.user,
    createdAt: new Date(message.createdAt),
    chatId: chatId
  };
  db.collection('messages').insert(messageData, (err, message) => {
    // If the message is from the server, then send to everyone.
    var emitter = fromServer ? socket.broadcast : websocket ;

    emitter.emit('chat_message', message);
  });
}

// Permettre l'acces au chat via la CLI en mode stdin.
var stdin = process.openStdin();
stdin.addListener('data', (d) => {
  _sendAndSaveMessage({
    text: d.toString().trim(),
    createdAt: new Date(),
    user: { _id: 'Robot',
    chatId :1,
    avatar:"https://i.pinimg.com/736x/67/b5/51/67b55118c1cb58ada2aac3b99c0b800a.jpg" }
  }, null /* no socket */, true /* envoi depuis la cli */);
});

App.initialize().then(async () => {
  const models = fs.readdirSync('./models')
  for (const model of models.filter((m) => m.endsWith('.ts'))) await import(`./models/${model}`)
  App.express.use(Router)
  await App.start()
})
