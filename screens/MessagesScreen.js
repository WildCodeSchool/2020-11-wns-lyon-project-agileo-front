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
  const [refresh, setrefresh] = useState(0)

  const [msg, setMsg] = useState('')
  const backgroundColor = overlay(2, theme.colors.surface);
  const socket = SocketIOClient('http://localhost:4000');

  /**
   * Récuperer les messages et envoyer le user en cours
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

  const _sendMessage = async (message) => {
    if (message[0].text !== '') {
      socket.emit('chat_message', message[0]);
      setrefresh(refresh + 1)
      setMsg('')
    } else return
  }


  return (

    <GiftedChat
      key={messages._id}
      bottomOffset={100}
      messages={messages}
      onSend={messages => _sendMessage(messages)}
      onChangeText={(msg) => setMsg(msg)}
      user={{ name: currentUser.firstName, chatId: 1, avatar: currentUser.avatar }}
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


export default Messages;
