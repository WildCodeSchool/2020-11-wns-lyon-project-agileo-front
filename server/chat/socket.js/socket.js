const path = require('path');
const queryHandler = require('../handlers/query-handler');
const CONSTANTS = require('../constants/constants');

class Socket {

    constructor(socket) {
        this.io = socket;
    }

    socketEvents() {

        this.io.on('connection', (socket) => {

            /* Get the user's Chat list	*/
            socket.on(`chat-list`, async (data) => {
            
                    try {
                        const [UserInfoResponse, chatlistResponse] = await Promise.all([
                            queryHandler.getUserInfo({
                                userId: data.userId,
                                socketId: false
                            }),
                            queryHandler.getChatList(socket.id)
                        ]);
                        this.io.to(socket.id).emit(`chat-list-response`, {
                            error: false,
                            singleUser: false,
                            chatList: chatlistResponse
                        });
                        socket.broadcast.emit(`chat-list-response`, {
                            error: false,
                            singleUser: true,
                            chatList: UserInfoResponse
                        });
                    } catch (error) {
                        this.io.to(socket.id).emit(`chat-list-response`, {
                            error: true,
                            chatList: []
                        });
                    
                }
            });

            /**
            * send the messages to the user
            */
            socket.on(`add-message`, async (data) => {
                
                    try {
                        const [toSocketId, messageResult] = await Promise.all([
                            queryHandler.getUserInfo({
                                userId: data.toUserId,
                                socketId: true
                            }),
                            queryHandler.insertMessages(data)
                        ]);
                        this.io.to(toSocketId).emit(`add-message-response`, data);
                    } catch (error) {
                        this.io.to(socket.id).emit(`add-message-response`, {
                            error: true,
                            message: CONSTANTS.MESSAGE_STORE_ERROR
                        });
                    }
                
            });

            /**
            * sending the disconnected user to all socket users. 
            */

            socket.on('disconnect', async () => {
                socket.broadcast.emit(`chat-list-response`, {
                    error: false,
                    userDisconnected: true,
                    userid: socket.request._query['userId']
                });
            });
        });

    }

    socketConfig() {
        this.io.use(async (socket, next) => {
            try {
                await queryHandler.addSocketId({
                    userId: socket.request._query['userId'],
                    socketId: socket.id
                });
                next();
            } catch (error) {
                // Error
                console.error(error);
            }
        });

        this.socketEvents();
    }
}
module.exports = Socket;