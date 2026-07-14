import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "MEOWT",
  avatar: "https://loremflickr.com/140/140",
};

const TRIVIA_DATA = [
  { question: "What event is today?", ans: "ping pong" },
  { question: "Who is the best ping pong player?", ans: "Kritika" },
  { question: "What is Ricardo's car color", ans: "lime green" },
  { question: "What team is the best in SEA?", ans: "Team EDWARD" },
  { question: "Who has a Sun allergy", ans: "ALEXIS" },
  { question: "Who has the coolest keyboard", ans: "Jade" },
  { question: "Who studied in Japan?", ans: "Sabrina" },
  { question: "Who loves the SF Bay?", ans: "Jae" },
  { question: "Who loves USC?", ans: "Abigail" },
  { question: "Who is a true Calfornian?", ans: "Kezhia" },
  { question: "Who doesn't know their Pokemons?", ans: "Jair" },
  { question: "Who is a Scammer?", ans: "Shawn" },
  { question: "Who most likely to adopt a fish and give it gadgets?", ans: "Alex" },
  { question: "Who's most likely to bring their pet to work day ?", ans: "Ryan" },
  { question: "Who's would be in an Optimus Prime movie?", ans: "Alexander" },
  { question: "Who's most likely to find bones in their backyard?", ans: "Vaughn"},
  { question: "Who's going to be walking the 24 miles in 2027?!", ans: "Viola"},
  { question: "Who's going to Troll", ans: "Mellisa"},
  { question: "Who's the GOAT", ans: "Jackie"}
  //viola
  //melissa
  //jassy
];

const WRONG_MEMES = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Zic3BtcXJud3F3cWp2Mms4N3Z6ZHp0ZTR5MTl3Ym95am0wa2lhMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hPPx8yk3Bmqys/giphy.gif", // "Wrong" buzzer
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTN0Nm96MzN6djg5dWp5cmZreW1mOHFmdm0zNmJmZHFrbzV0Z3V6ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26AsTEoZ9O9VstgS4/giphy.gif", // Steve Harvey shock
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzh0bnd5MmIwbHBiN3FmOHIwbmdscWl2dmZnaTBtMWg1a2FndnYwNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/R51a8oAH7KwbS/giphy.gif", // Forrest Gump "Stupid is as stupid does"
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnd6bW85MG82c2tvd3Uzdzc1Y29nNjNxa3Q3YzJ0YnhiZTh2dTBoZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d2W7eH7uvEZ3bxVS/giphy.gif", // Disappointed look
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHh1b2h0dHlsdmQyb3R3MHVpcnl1ZThpbnB1cG9rcmVsbndidXoxdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/14aUO0QHPNygU0/giphy.gif"  // "No" office meme
];

export default function App() {
  const [messages, setMessages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);

  useEffect(() => {
    if (messages.length < 1) {
      addBotMessage(
        "Hello, welcome to simple trivia! Say 'Yes' when you're ready to play!",
      );
    }
  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      return GiftedChat.append(previousMessages, newMessages);
    });
  };

const addBotMessage = (text, imageUrl = null) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
        ...(imageUrl && { image: imageUrl }), // Only injects the image property if imageUrl exists
      },
    ]);
  };

  const respondToUser = (userMessages) => {
    const userAnswer = userMessages[0].text.toLowerCase().trim();

    // 1. GAME HAS NOT STARTED YET
    if (currentQuestionIndex === -1) {
      console.log("Recent user msg:", userMessages[0].text);
      if (userAnswer === "yes") {
        addBotMessage("I am da response!");
        setCurrentQuestionIndex(0);
        addBotMessage(TRIVIA_DATA[0].question);
      } else {
        addBotMessage("Say Yes to start!");
      }
      return;
    }

    // 2. USER IS ACTIVELY PLAYING THE TRIVIA
    const currentTrivia = TRIVIA_DATA[currentQuestionIndex];
    const nextIndex = currentQuestionIndex + 1;

    if (userAnswer === currentTrivia.ans.toLowerCase()) {
      // --- CORRECT ANSWER FLOW ---
      addBotMessage("Wow Smarty Pants!");

      if (nextIndex < TRIVIA_DATA.length) {
        setCurrentQuestionIndex(nextIndex);
        addBotMessage(TRIVIA_DATA[nextIndex].question);
      } else {
        addBotMessage("Welp, you're done with the unhinged but also hindged trivia!");
        setCurrentQuestionIndex(-1); // Reset game state
      }
    } else {
      // --- WRONG ANSWER FLOW ---
        
        const randomMemeIndex = Math.floor(Math.random() * WRONG_MEMES.length);
        const chosenMemeUrl = WRONG_MEMES[randomMemeIndex];
      addBotMessage(" AYO! WRONG! The correct answer was: " + currentTrivia.ans, chosenMemeUrl);
        


      if (nextIndex < TRIVIA_DATA.length) {
        setCurrentQuestionIndex(nextIndex);
        
        const nextQuestionText = TRIVIA_DATA[nextIndex].question;
        setTimeout(() => {
          addBotMessage(nextQuestionText);
        }, 800);
      } else {
        addBotMessage("Welp, that was the last one! You finished the unhinged trivia. 🏁");
        setCurrentQuestionIndex(-1); // Reset game state
      }
    }
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => {
            onSend(messages);
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