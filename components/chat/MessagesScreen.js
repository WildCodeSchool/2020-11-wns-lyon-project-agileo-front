import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useAuth } from "../../contexts/AuthContext";
import moment from 'moment';
import { GiftedChat } from 'react-native-gifted-chat'
import SocketIOClient from 'socket.io-client';


const Messages = (props) => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState()
  const [refresh, setrefresh] = useState(0)
  const [msg, setMsg] = useState('')
  const socket = SocketIOClient('http://localhost:4000');



  /**
   * Récuperer les messages
   */
  useEffect(() => {

    async function doesSocketAgree() {
      await new Promise(resolve => {
        socket.on("get_messages", msg => {
          setMessages(msg)
        })
        resolve(msg);
      });
    }
    doesSocketAgree();
  }, [props, currentUser])



  /**
   * envoyer un message
   */


  const _sendMessage = async (message) => {

    const newMessages = await GiftedChat.append(messages, message[0])
    socket.emit('chat_message', message[0]);
    setrefresh(refresh + 1)
    setMsg('')
  }

  console.log("messages", messages)
  const renderMessage = (user) => {
    return (
      <View  style={styles.list}>
        <View style={{ flex: 1, marginLeft: 10 }} >
          <Text> {user && user.user.firstName} </Text>
          <Text>{user.text}</Text>
        </View>
      </View>
    );
  };


  /**<GiftedChat
      messages={messages || []}
      onSend={messages => onSend(messages)}
      user={{ _id: currentUser._id, name:currentUser.firstName,avatar:currentUser.pictureUrl}}
    /> */
  const goBack = () => {
    props.setOpenChat({ ...props.openChat, open: false, user: null })
  }

  return (
    <View style={styles.container}>
      <Text>hello</Text>
      <FlatList

        data={messages}
        renderItem={({ item }) => renderMessage(item)}
        keyExtractor={item => item._id.toString()}
      />

      <button onClick={goBack}>Return</button>
    </View>
  )
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
