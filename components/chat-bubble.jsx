import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ChatBubble = ({ role, text }) => {
  return (
    <View
      className={
        role === "user"
          ? "relative mb-2.5 p-2.5 rounded-xl self-end bg-indigo-400"
          : "relative mb-2.5 p-2.5 rounded-xl self-start bg-[#333]"
      }
    >
      <Text className="text-[#fff] text-base">{text}</Text>
    </View>
  );
};

export default ChatBubble;
