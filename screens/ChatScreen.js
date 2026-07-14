import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform, Text } from "react-native";
import BasicChatbot from "../components/BasicChatbot";
import AlexisChatbot from "../components/AlexisChatbot";
import VaughnChatbot from "../components/VaughnChatbot";
import ShawnsChatBot from "../components/ShawnsChatBot";

// prettier-ignore
export const CHATBOTS = {
  "BasicChatbot": {
    id: "BasicChatbot",
    name: "React Native Chatbot",
    imageUrl: "https://loremflickr.com/140/140",
    component: BasicChatbot,
  },
  "AlexisChatbot": {
    id: "AlexisChatbot",
    name: "Dog Trivia",
    imageUrl: "https://img.freepik.com/free-vector/cute-dog-robot-cartoon-character-animal-technology-isolated_138676-3143.jpg?w=150",
    component: AlexisChatbot,
  },
 
    "VaughnChatbot" : {
      id: "VaughnChatbot",
      name: "Math Game",
      imageUrl: "/Users/valston/Desktop/SEA - Project/ShowCase_2/snapchatbots-vaughnalston/assets/images/mrbaldy.jpg",
      component: VaughnChatbot,
},

    "ShawnsChatBot" : {
      id: "ShawnChatBot",
      name: "Shawn Chat Bot",
      imageUrl: "https://loremflickr.com/140/140",
      component: ShawnsChatBot,
}








};

export default function ChatScreen({ route }) {
  const { chatbotName } = route.params;

  const makeChatbotComponent = (chatbotName) => {
    if (CHATBOTS[chatbotName]) {
      const Chatbot = CHATBOTS[chatbotName].component;
      return <Chatbot />;
    } else {
      return <Text>No Chatbot Found with name '{chatbotName}'</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {makeChatbotComponent(chatbotName)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
