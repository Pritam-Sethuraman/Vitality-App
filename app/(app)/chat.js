import { View, Text } from "react-native";
import { useEffect } from "react";
import { apiCall } from "../api/openAi";

export default function ChatPage() {
  useEffect(() => {
    apiCall("What is broken Ankle?");
  }, []);
  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
}
