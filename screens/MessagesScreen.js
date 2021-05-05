import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, TextInput, Text,TouchableOpacity } from 'react-native';
import { Headline, Caption, useTheme, Button } from 'react-native-paper';
import SocketIOClient from 'socket.io-client';
import { useAuth } from "../contexts/AuthContext";
import moment from 'moment';

import overlay from '../scripts/overlay';

const Messages = (props) => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([])
  const [msg, setMsg] = useState('')
  const backgroundColor = overlay(2, theme.colors.surface);
  const socket = SocketIOClient('http://localhost:4000');

  useEffect(() => {
    socket.on("chat message", msgin => {
      setMessages((currentMessages) => [...currentMessages, msgin])
    });

  }, [])

  /**
   * envoyer un message
   */

  const _sendMessage = () => {

    socket.emit('chat message', {
      from: currentUser.firstName,
      text: msg,
      createdAt: moment().fromNow()
    });
    setMsg('')
  }

  const chatMessages = messages && messages.map((m, i) => (
    <Text key={m + '' + i}>{m.text}</Text>
  ));
  return (
    <ScrollView
      style={{ backgroundColor }}
      contentContainerStyle={[styles.scrollViewContent, { backgroundColor }]}
    >
      <Headline style={styles.centerText}>
        Send a message, get a message
      </Headline>
      <Caption style={styles.centerText}>
        Private Messages are private conversations between you and other people
        on Twitter. Share Tweets, media, and more!
      </Caption>

      <View style={styles.container}>
        <TextInput
          style={{ height: 40, borderWidth: 2 }}
          autoCorrect={false}
          value={msg}
          onSubmitEditing={_sendMessage}
          onChangeText={(msg) => setMsg(msg)}
        />
        {chatMessages}
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => _sendMessage()}
        >
          <Text style={{color: '#fff', fontSize: 18}}> Send </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
