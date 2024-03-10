import { View, Text, ActivityIndicator } from "react-native";

export default function LandingPage() {
  return (
    <View className="h-screen justify-center">
      <ActivityIndicator
        size="large"
        color="gray"
        className="flex items-center justify-center"
      />
    </View>
  );
}
