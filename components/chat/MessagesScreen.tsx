import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import SocketIOClient from 'socket.io-client';
import { useAuth } from "../../contexts/AuthContext";
import moment from 'moment';
import { GiftedChat } from 'react-native-gifted-chat'



const Messages = (props) => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<any[]>([])
  const [refresh, setrefresh] = useState<number>(0)
  const [msg, setMsg] = useState<string>('')
  const socket = SocketIOClient('http://localhost:4000');

  /**
   * Récuperer les messages
   */
  useEffect(() => {
    socket.emit('userJoined', currentUser)
    socket.on("chat_message", msg => {
      if (msg && msg.length > 0) {
        setMessages(msg)
      }

    })
  }, [refresh])

  /**
   * envoyer un message
   */

  /* const onSend = async (message = []) => {
    const newMessages = await GiftedChat.append(messages, message)
    socket.on('chat message', newMessages => { setMessages(newMessages) }); 
    socket.emit('chat message', newMessages);
  } */
  const _sendMessage = async (message) => {

    const newMessages = await GiftedChat.append(messages, message[0])
    console.log(newMessages)
    socket.emit('chat_message', message[0]);
    setrefresh(refresh + 1)
    setMsg('')
  }


  return (

    <GiftedChat 
    
      messages= { messages }
      onSend = { messages => _sendMessage(messages)}
      onInputTextChanged = {(msg) => setMsg(msg)}
      user = {{ name: currentUser && currentUser.firstName, _id: currentUser && currentUser.id, avatar: currentUser && currentUser.avatar }}
      alignTop
      alwaysShowSend
      scrollToBottom
      showUserAvatar
      inverted = { false}
      renderUsernameOnMessage
      bottomOffset = { 26}
      isCustomViewBottom
      messagesContainerStyle = {{ backgroundColor: 'indigo' }}
/>

  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  button: {
    marginTop: 20,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f73e0',
  }
});

export default Messages;
