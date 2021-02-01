import React, { useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import io from 'socket.io-client';
import styles from "./user.module.css"
import ChatSocketServer from '../shared/helpers/ChatSocketServer';


const Message = props => {
    const chatBox = useRef(null);

    const [messages, setMessages] = useState([])
    const [messageLoading, setmessageLoading] = useState(true)
    const [chatListUsers, setchatListUsers] = useState([])
    const [selectedUserId, setselectedUserId] = useState(null)



    const socket = io.connect("http://localhost:5000");

    /*  function fetchMessages(userId,toUserId) {
         return new Promise(async (resolve, reject) => {
             try {
                 const response = await axios.post('http://localhost:5000/getMessages', {
                     userId: userId,
                     toUserId: toUserId
                 });
                 resolve(response.data);
             } catch (error) {
                 reject(error);
             }
         });
     }
      */




    /*  useEffect(() => {
         //ChatSocketServer.receiveMessage();
         establishSocketConnection()
         ChatSocketServer.eventEmitter.removeListener('add-message-response', receiveSocketMessages);
         ChatSocketServer.eventEmitter.on('add-message-response', receiveSocketMessages);
 
     }, []) */

    const scrollToBottom = () => {
        chatBox.current.scrollIntoView();
    };


    const receiveSocketMessages = (socketResponse) => {
        if (selectedUser !== null && selectedUser.id === socketResponse.fromUserId) {
            setMessages({
                messages: [...messages, socketResponse]
            });
            scrollToBottom();
        }
    }

    /* fetchMessages = async () => {
        try {
            const { userId, newSelectedUser } = props;
            const messageResponse = await fetchMessages(userId, newSelectedUser.id);
            if (!messageResponse.error) {
                setMessages({
                    messages: [...messages, messageResponse.messages]
                });
                scrollToBottom();
            } else {
                alert('Unable to fetch messages');
            }
            setmessageLoading(false);
        } catch (error) {
            console.error(error)
        }
    } */



    const sendMessage = (e) => {
        const message = e.target.value
        /* sendAndUpdateMessages({
            fromUserId: userId,
            message: (message).trim(),
            toUserId: newSelectedUser.id,
        }); */
        setMessages(messages => [...messages, { message: message }]);
        socket.emit("add-message", messages);
    }

    const sendAndUpdateMessages = (message) => {

        try {
            ChatSocketServer.sendMessage(message);
            setMessages({
                messages: [...messages, message]
            });
            scrollToBottom();
        } catch (error) {
            alert(`Can't send your message`);
        }
    }



    const handleChange = async e => {
        setMessages([
            {
                message: e.target.value,
                fromUserId: props.email,
                toUserId: "String",
                timestamp: moment().format()
            }
        ]);
    };


    return (
        <>
            <div className={styles.personal_chat}>
                <div className={styles.chats_header}>
                    <div className={styles.back_button} >
                        <div className={styles.bar1} />
                        <div className={styles.bar2} />
                        <div className={styles.bar3} />
                    </div>
                    <div className={styles.user_typing}>
                        <p>Abdel</p>
                    </div>
                </div>


                <div className={styles.all_messages}>
                    {messages ? messages.map((item, id) =>
                    (
                        <div
                            key={id}
                            className={styles.receiver}
                        >
                            <div className={styles.sender_name}>{item.user}</div>
                            {item.message}{' '}
                            <span className={styles.time}> {moment(item.timestamp).fromNow()}</span>
                        </div>
                    )
                    ) : 'pas de messages'}
                </div>

                <div>
                    <form
                        onSubmit={sendMessage}
                        ref={chatBox}
                        className={styles.chat_box}
                    >
                        <TextField
                            style={{ margin: 10 }}
                            placeholder={'Say something to '}
                            fullWidth
                            name="message"
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            value={messages.message}
                        />
                        <button>Send</button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Message;

