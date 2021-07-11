import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useAuth } from "../../contexts/AuthContext";
import moment from 'moment';
import { GiftedChat } from 'react-native-gifted-chat'



const Messages = (props) => {
  const theme = useTheme();
  const { currentUser ,socket} = useAuth();
  const [messages, setMessages] = useState<any[]>([])
  const [refresh, setrefresh] = useState<number>(0)
  const [msg, setMsg] = useState<string>('')


  /**
   * Récuperer les messages
   */
  useEffect(() => {
    socket.on("chat_message", msg => {
      if (msg && msg.length > 0) {
        setMessages(msg)
      }

    })
  }, [refresh, props.user])



  /**
   * envoyer un message
   */


  const _sendMessage = async (message) => {

    const newMessages = await GiftedChat.append(messages, message[0])
    socket.emit('chat_message', message[0]);
    setrefresh(refresh + 1)
    setMsg('')
  }

const goBack =()=>{
  props.setOpenChat({...props.openChat,open:false,user:null})
}


  return (
    <div>
    <button onClick={goBack}>Click</button>

      <GiftedChat
      messages = { messages }
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
  </div>
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
