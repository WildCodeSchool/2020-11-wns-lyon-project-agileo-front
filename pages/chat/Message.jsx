import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import io from 'socket.io-client';
import styles from "./user.module.css"


const Message = props => {
    const chatBox = useRef(null);
    const [messages, setMessages] = useState([])
    const socket = io.connect("http://localhost:3000");
    const scrollToBottom = () => {chatBox.current.scrollIntoView()};

    const sendMessage = (e) => {
        try {
            socket.emit("add-message", messages);
            scrollToBottom();
        } catch (error) {
            alert(`Can't send your message`);
        }
        e.preventDefault();
        setMessages('')
    }

    const handleChange = async e => {
        setMessages([
            {
                message: e.target.value,
                fromUserId: props.firstName,
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
                    ) : ''}
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

