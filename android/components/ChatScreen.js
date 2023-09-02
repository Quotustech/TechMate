import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      isUser: true, // You can differentiate between user and AI messages
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const renderMessage = ({ item }) => (
    <View style={item.isUser ? styles.userMessage : styles.aiMessage}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 24,

  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0bc3c8',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    maxWidth: '90%',

  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    maxWidth: '70%',

  },
  messageText: {
    color: '#131717',
    fontSize: 16,

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    
    
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 24,
    color:'#131717',
    paddingHorizontal: 16,
    paddingVertical: 8,

  },
  sendButton: {
    marginLeft: 12,
    backgroundColor: '#131717',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatScreen;
