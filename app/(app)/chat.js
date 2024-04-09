import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import ChatBubble from "../../components/chat-bubble";
import KeyboardView from "../../components/keyboard-view";

export default function ChatPage() {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "";

  const handleUserInput = async () => {
    const keywords = ["exercise", "recovery", "leg", "workout"]; // Add more keywords as needed
    const containsKeyword = keywords.some((keyword) =>
      userInput.toLowerCase().includes(keyword)
    );

    let updatedChat;
    if (containsKeyword) {
      updatedChat = [
        ...chat,
        {
          role: "user",
          parts: [{ text: userInput }],
        },
      ];

      setLoading(true);

      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
          {
            contents: updatedChat,
          }
        );
        console.log("Gemini Pro API Response: ", response.data);

        const modelResponse =
          response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        if (modelResponse) {
          const updatedChatWithModel = [
            ...updatedChat,
            {
              role: "model",
              parts: [{ text: modelResponse }],
            },
          ];
          setChat(updatedChatWithModel);
          setUserInput("");
        }
        console.log("Model Response: ", modelResponse);
      } catch (error) {
        console.error("Error calling Gemini Pro API:", error);
        console.error("Error response:", error.response);
        setError("An error occured. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      updatedChat = [
        ...chat,
        {
          role: "model",
          parts: [
            {
              text: "I'm your recovery bot, ask me anything related to leg injury recovery.",
            },
          ],
        },
      ];
      setChat(updatedChat);
      setUserInput("");
    }
  };

  const renderChatItem = ({ item }) => (
    <ChatBubble role={item.role} text={item.parts[0].text} />
  );

  return (
    <View className="flex-1 p-4 bg-[#f8f8f8]">
      <Text className="text-2xl font-bold text-[#333] text-center mt-10 mb-5">
        Vitality ChatBot
      </Text>

      <FlatList
        data={chat}
        renderItem={renderChatItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-end",
        }}
      />

      <View className="flex-row items-center mt-3">
        <TextInput
          className="flex-1 h-10 mr-2 p-2.5 border rounded-3xl border-[#333] text-[#333] bg-[#fff]"
          placeholder="Type your message..."
          placeholderTextColor="#aaa"
          value={userInput}
          onChangeText={setUserInput}
        />
        <TouchableOpacity
          onPress={handleUserInput}
          className="p-2.5 bg-indigo-500 rounded-3xl"
        >
          <Text className="text-[#fff] text-center">Send</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator className="mt-2.5" color="#333" />}
      {error && <Text className="text-red mt-2.5">{error}</Text>}
    </View>
  );
}
