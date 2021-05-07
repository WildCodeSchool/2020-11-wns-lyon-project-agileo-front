import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, TextInput, Text, AsyncStorage } from 'react-native';
import { Headline, Caption, useTheme, Button } from 'react-native-paper';
import SocketIOClient from 'socket.io-client';
import { useAuth } from "../contexts/AuthContext";
import moment from 'moment';
import { GiftedChat } from "react-web-gifted-chat";
import overlay from '../scripts/overlay';


const Messages = (props) => {

  const theme = useTheme();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([])
  const [msg, setMsg] = useState('')
  const backgroundColor = overlay(2, theme.colors.surface);
  const socket = SocketIOClient('http://localhost:4000');

  /**
   * Récuperer les messages
   */
  useEffect(() => {
    socket.on('chat-message', newMessages => {
console.log("eofk")
      let newArray = [...messages]
      newArray = [...newArray.reverse(), newMessages[0]]
      setMessages(newArray)
    });

  }, [])

  /**
   * envoyer un message
   */

  /* const onSend = async (message = []) => {
    const newMessages = await GiftedChat.append(messages, message)
    socket.on('chat message', newMessages => { setMessages(newMessages) }); 
    socket.emit('chat message', newMessages);
  } */
  const _sendMessage = async (message) => {
    const newMessages = await GiftedChat.append(messages, message)
    socket.emit('chat-message', newMessages);
    /* let newArray = [...messages]
  newArray = [...newArray.reverse(), newMessages[0]]
  setMessages(newArray) */
    setMsg('')
  }


  return (

    <GiftedChat
      bottomOffset={100}
      messages={messages}
      onSend={messages => _sendMessage(messages)}
      onChangeText={(msg) => setMsg(msg)}
      user={currentUser}
      alignTop
      alwaysShowSend
      scrollToBottom
      showUserAvatar
      inverted={false}
      renderUsernameOnMessage
      bottomOffset={26}
      onPressAvatar={console.log}
      isCustomViewBottom
      messagesContainerStyle={{ backgroundColor: 'indigo' }}
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
