import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';


let QuestionArray = [
{
    "question" : "What is 2 + 2?",
    "answer": "4"
  },

  {
    "question": "What is 10 + 10?",
     "answer": "20"
  },

  {
    "question": "What is 50 + 10?",
     "answer": "60"
  },

  {
    "question": "What is 50 + 50?",
    "answer": "60"
  }
];










const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  avatar: "https://loremflickr.com/140/140",
};

export default function App() {
  // Here we hae a state variable that will track the users response
  const [messages, setMessages] = useState([]);




  //This will help me restart if the story is false then don't start if it is true begin
  const [begin, setStory] = useState(false);





  useEffect(() => {
    if (messages.length < 1) {
      // Add a "starting message" when chat UI first loads
      addBotMessage(
        "Say Yes to start",
      );
    }

  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
       console.log("PREVIOUS MESSAGES:", previousMessages);
      // console.log("NEW MESSAGE:", newMessages);
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


  const [count, setCount] = useState(0);




  const respondToUser = (userMessages) => {
    // console.log("Recent user msg:", userMessages[user_msg_count].text);

// If the game hasnt started
  if(!begin) 
  {

      // check whether the user wants to start the game
      if(userMessages[count].text.toLowerCase() === 'yes')
      {
        setStory(true);
        GameStart();
      }
      else {

      addBotMessage("Please Say Yes to start");

      }
  }
   else {

   

    CheckAnswer(userMessages);
    addBotMessage(count + "/ 4 Correct!");
    addBotMessage(QuestionArray[count].question);




   }

};


// for each point increment

// Hold the answer
const [answer, setAnswer] = useState(0);




// Intro for the game
const GameStart = () => {
  addBotMessage("Welcome we will begin");
  addBotMessage(QuestionArray[count].question);
};


const CheckAnswer = (userMessages) => {

  const userAnswer = userMessages[0].text;

  if(userAnswer == QuestionArray[count].answer)
  {
      addBotMessage("Correct");

      setCount(count + 1);
  
  } 
  else {

    addBotMessage("Try Again");

  }

}













  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);




  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => {
            onSend(messages);
            // Wait a sec before responding
            setTimeout(() => respondToUser(messages), 1000);
          }}
          user={{
            _id: 1,
            name: "Chilla",
          }}
          renderUsernameOnMessage={true}  
        />
      </SafeAreaView> 
    </SafeAreaProvider>
  );
}

// Workaround to hide an unnessary warning about defaultProps
const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};