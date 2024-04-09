import { Tabs } from "expo-router";
import Header from "../../components/header";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          header: () => <Header />,
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          header: () => <Header />,
          tabBarIcon: () => (
            <AntDesign name="profile" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          header: () => <Header />,
          tabBarIcon: () => (
            <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
