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
  const [messages, setMessages] = useState<any[]>([])
  const [refresh, setrefresh] = useState<number>(0)
  const [msg, setMsg] = useState<string>('')
  const socket = SocketIOClient('http://localhost:4000');

  
  /**
   * Récuperer les messages
   */
  /* useEffect(() => {
    socket.on("chat_message", msg => {
      if (msg && msg.length > 0) {
        setMessages(msg)
      }

    })
  }, [refresh, props.user]) */

 /**
   * Récuperer les messages
   */
  useEffect(() => {
    socket.on("get_message", msg => {
      setMessages(msg)
    })
  }, [props])



  /**
   * envoyer un message
   */


  const _sendMessage = async (message) => {

    const newMessages = await GiftedChat.append(messages, message[0])
    socket.emit('chat_message', message[0]);
    setrefresh(refresh + 1)
    setMsg('')
  }

const renderData = (u) =>{
  return(
    <View style={{ flex: 1, marginLeft: 10 }} >
    <Text> {u && u.user.name} </Text>
    <Text> {u.text} </Text>
    
</View>
  )
}

const goBack =()=>{
  props.setOpenChat({...props.openChat,open:false,user:null})
}

  return (
  <View>
  
    <FlatList
      data = { messages}
      renderItem={({item} ) => renderData(item)}
      />

  
    <button onClick={goBack}>Click</button>
  
  </View>

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
