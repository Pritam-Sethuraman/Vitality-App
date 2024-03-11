import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Accelerometer } from "expo-sensors";

export default function AcclData() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribe = () => {
    //@ts-ignore
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    // @ts-ignore
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={{ justifyContent: "center", paddingHorizontal: 20 }}>
      <Text className="text-center">
        Accelerometer: (in gs where 1g = 9.81 m/s^2)
      </Text>
      <Text className="text-center">x: {x}</Text>
      <Text className="text-center">y: {y}</Text>
      <Text className="text-center">z: {z}</Text>

      <View
        style={{ flexDirection: "row", alignItems: "stretch", marginTop: 15 }}
      >
        <TouchableOpacity
          onPress={subscription ? _unsubscribe : _subscribe}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#eee",
            padding: 10,
          }}
        >
          <Text className="text-center">{subscription ? "On" : "Off"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={_slow}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#eee",
            padding: 10,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: "#ccc",
          }}
        >
          <Text className="text-center">Slow</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={_fast}
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#eee",
            padding: 10,
          }}
        >
          <Text className="text-center">Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
