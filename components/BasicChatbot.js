import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { getChat } from "../utils/getChatGPT";



//This will will be passed to the getChat function as 
const prompt = [
  {
    role: "system",
    content:
    "How close is earth to the suns"
  },
];







async function fetchInitialMessage() {
  //The getChat function takes in array prompt
  const response = await getChat(prompt);
  if (response.error) {
    console.log("RESPONSE ERROR", response);
  } else {


    //Im assuming this line takes in 
    const message = response.choices[0].message;


    //Also chatgpt message
    console.log("message: ", message);
    const content = response.choices[0].message.content;


    //This will be the ChatGpt  messege
    console.log("content: ", content);
  }
}


const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  avatar: "https://loremflickr.com/140/140",
};

export default function BasicChatbot() {
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState(prompt);

  useEffect(() => {
    setMessages([

      {
       
        _id: 1,
        text: "Hello, welcome to simple trivia! Say 'Yes' when you're ready to play!",
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },

      
    ]);

  

  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      // console.log("PREVIOUS MESSAGES:", previousMessages);
       console.log("NEW MESSAGE:", newMessages);

      return GiftedChat.append(previousMessages, newMessages);
    });
  };


  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };

const respondToUser = async (userMessages) => {

    console.log("User message text:", userMessages[0].text);

    // build your conversation array
  const complete = [
  ...chatHistory,
  {
    role: "user",
    content: userMessages[0].text,
  },
];


    // call getChat()
    const response = await getChat(complete);

if (response.error) {
  console.log(response.error);
  return;
}

    // get the response

    const botReply = response.choices[0].message.content;




    // update chat history
     setChatHistory([
      ...complete,
      {
        role: "assistant",
        content: botReply,
      },
    ]);



    // display the bot response
        addBotMessage(botReply);

};






  //Here I want to take the user value and push it into an array of objects

  //In that array of objects I will have a const value that will be user

  







  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "Baker",
      }}
      renderUsernameOnMessage={true}
    />
  );
}
