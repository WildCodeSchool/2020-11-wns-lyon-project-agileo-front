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
import { GiftedChat } from 'react-web-gifted-chat'
import SocketIOClient from 'socket.io-client';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const Messages = (props) => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState()
  const [refresh, setrefresh] = useState(0)
  const [msg, setMsg] = useState('')
  const socket = SocketIOClient('http://localhost:4000');
  const userChatting = { receiver: props.user.email, sender: currentUser.email }


  /**
   * Récuperer les messages
   */
  useEffect(() => {

    async function awaitSocket() {

      await new Promise(resolve => {
        socket.emit("get_messages", userChatting)
        socket.on("get_messages", (msg) => {
          setMessages(msg)
        })
        socket.on("send_message", (msg) => {
          setMessages([...messages,msg])
        })
        resolve(msg);
      });
    }
    awaitSocket();
  }, [])


  /**
   * envoyer un message
   */

  
  const _sendMessage = async (message) => {
    const messageToSend = { from: currentUser, to: props.user, text: message[0].text, user: currentUser }
    socket.emit('send_message', messageToSend);
    setrefresh(refresh + 1)
    setMsg('')
  }


  const goBack = () => {
    props.setOpenChat({ ...props.openChat, open: false, user: null })
  }

  return (
    <View style={styles.container}>
      <Button
        style={{ width: '50px'}}
        onPress={goBack}
        icon={
          <Icon
            name="arrow-left"
            size={10}
            color="white"
            onClick={goBack}
          />
        }
        title=""
      />
      <GiftedChat
        id={currentUser.id + "id"}
        messages={messages}
        onSend={messages => _sendMessage(messages)}
        onInputTextChanged={(msg) => setMsg(msg)}
        user={{ name: currentUser && currentUser.firstName, _id: currentUser && currentUser.id, avatar: currentUser && currentUser.avatar }}
        alignTop
        alwaysShowSend
        scrollToBottom
        showUserAvatar={true}
        inverted={false}
        renderUsernameOnMessage
        isCustomViewBottom
        messagesContainerStyle={{ backgroundColor: 'indigo' }}
      />
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
    height: "100%",
    position: "absolute",
    width: "100%",
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
