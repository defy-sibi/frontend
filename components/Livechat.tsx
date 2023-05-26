import React, {useEffect, useState} from 'react';
import SendBird from 'sendbird';
import {View, Text, StyleSheet, TextInput, Button, FlatList} from 'react-native';

// Replace 'YOUR_APP_ID' with your actual Sendbird application ID.
// Replace 'YOUR_USER_ID' with your actual Sendbird user ID.
const APP_ID = '3E3C331B-A65A-4BD5-BD00-E12CB554B5DD';
const USER_ID = 'YOUR_USER_ID';

const LiveChat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [channel, setChannel] = useState<any>(null);
  const [messages, setMessages] = useState<Array<any>>([]);

  const sb = new SendBird({appId: APP_ID});
  useEffect(() => {
    sb.connect(USER_ID, function (user, error) {
      if (error) {
        console.error('Error connecting to Sendbird:', error);
      } else {
        console.log('Connected to Sendbird as user:', user);
      }
      var openChannelParams = new sb.OpenChannelParams();
      openChannelParams.operatorUserIds = [USER_ID];
      openChannelParams.customType = 'liveChat';

      sb.OpenChannel.createChannel(
        openChannelParams,
        function (openChannel, error) {
          if (error) {
            console.log(error);
            return;
          }
          openChannel.enter(function (response, error) {
            if (error) {
              console.error('Could not join the channel: ', error);
              return;
            }
            setChannel(openChannel);
          });
        },
      );
    });

    return () => {
      sb.disconnect(function () {
        console.log('Disconnected from Sendbird.');
      });
    };
  }, [sb]); // note: add 'sb' to dependencies

  const sendMessage = () => {
    if (channel && message) {
      channel.sendUserMessage(message, (message, error) => {
        if (error) {
          console.error('Send message failed.', error);
        } else {
          console.log('Message sent!', message);
          setMessage('');
          setMessages(previousMessages => [...previousMessages, message]);
        }
      });
    }
  };
  // Display the messages in the chat
  const renderMessage = ({item}) => {
    return (
      <View style={styles.messageContainer}>
        <Text>{item.message}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>LiveChat Screen Placeholder</Text>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.messageId.toString()}
        inverted
      />
      <TextInput
        value={message}
        onChangeText={text => setMessage(text)}
        placeholder="Type your message"
        style={styles.input}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
  },
});

export default LiveChat;
