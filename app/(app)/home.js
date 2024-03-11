import {
  View,
  Text,
  Button,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import AcclData from "../../components/accl-data";

export default function HomePage() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* Logout Button */}
      <View></View>

      {/* Accelerometer Data */}
      <View>
        <AcclData />
      </View>
    </View>
  );
}
