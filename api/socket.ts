let mongojs = require('mongojs');
let db = mongojs(process.env.MONGO_URI || 'localhost:27017/local');

let users = {};
let socketId = {};

/**
 * 
 * @param {*} message le message recu
 * @param {*} senderSocket  La connexion socket concerné
 */

const onChatReceived = (message, senderSocket) => {
    try {
        SaveReceivedChat(message, senderSocket);
    } catch (err) {
        console.error({ message: "erreur lors de la réception du message", err })
    }
}


/**
 * 
 * @param {*} user user qui se connecte
 * @param {*} socket La connexion socket concerné
 */

const onUserConnect = async (user, socket) => {
    try {
        users[user.id] = user.email;
        socketId[socket.id] = user.email;
        socket.emit("onlineUsers", users);

    } catch (err) {
        console.error({ message: 'erreur coté back lors de la récuperation des messages', err });
    }
}

/**
 * 
 * @param {*} message récupere les messages de l'utilisateur en cours
 * @param {*} socket 
 */

const getExistingMessages = async (message, socket) => {

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
        });
}

function SaveReceivedChat(message, socket) {

    let messageData = {
        text: message.text,
        sender: message.from,
        receiver: message.to,
        createdAt: new Date(),
        user: message.from
    };

    db.collection('messages').insert(messageData, (err, message) => {
        socketId[message.receiver.email] = message.receiver.email
        let newmessage = message
        socket.emit('send_message', newmessage);
        console.log(newmessage)
    });
}



module.exports = {
    onUserConnect,
    getExistingMessages,
    users,
    socketId,
    onChatReceived
}