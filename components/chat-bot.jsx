import { View, Text } from "react-native";
import { useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";

function ChatBot() {
  const [messages, setMessages] = useState([]);

  // const apiUrl = "https://api.openai.com/v1/chat/completions";
  const apiUrl =
    "https://api.openai.com/v1/engines/text-davinci-003/completions";
  // const apiKey = process.env.OPEN_API_KEY;
  const apiKey = "";

  const handleSend = async (newMessages = []) => {
    try {
      // Get the user's message
      const userMessage = newMessages[0];

      // Add the user's messages
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, userMessage)
      );
      const messageText = userMessage.text.toLowerCase();
      const keywords = ["exercise", "recovery", "leg", "workout"]; // Add more keywords as needed

      // Handle irrelevant requests
      if (!keywords.some((keywords) => messageText.includes(keywords))) {
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: "I'm you'recovery bot, ask me anything related to leg injury recovery",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Vitality Bot",
          },
        };

        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, botMessage)
        );
        return;
      }

      // Handle recovery related requests
      const response = await axios.post(
        apiUrl,
        {
          prompt: `Give me an excercise for ${messageText}`,
          max_tokens: 1200,
          temperature: 0.2,
          n: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      console.log(response.data);

      const exercise = response.data.choices[0].text.trim();
      const botMessage = {
        _id: new Date().getTime() + 1,
        text: exercise,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Vitality Bot",
        },
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, botMessage)
      );
    } catch (e) {
      console.error("Error: ", e);
    }
  };
  return (
    <View className="flex-1">
      <View className="p-2.5 mt-10 mb-1 items-center justify-center bg-[#f5f5f5] border ">
        <Text className="font-bold text-3xl">Vitality Bot</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{ _id: 1 }}
      />
    </View>
  );
}

export default ChatBot;
