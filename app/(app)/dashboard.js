import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DeviceMotion } from "expo-sensors";
import { router } from "expo-router";
import axios from "axios";

export default function Dashboard() {
  const [subscription, setSubscription] = useState(null);

  const [motionData, setMotionData] = useState([]);
  const [responseData, setResponseData] = useState(null);

  const _subscribe = () => {
    DeviceMotion.setUpdateInterval(20); // 50 Hz
    setSubscription(DeviceMotion.addListener(onDeviceMotionChange));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const handlePost = async () => {
    const apiUrl = "http://47.243.206.82:8080/analyze-data";

    try {
      const response = await axios.post(apiUrl, motionData);
      setResponseData(response.data);
      console.log("Response: ", response.data);
    } catch (error) {
      console.error("Error sending POST request to API:", error);
    }
  };

  const onDeviceMotionChange = (event) => {
    const {
      accelerationIncludingGravity,
      rotationRate,
      rotation,
      acceleration,
    } = event;

    if (
      accelerationIncludingGravity &&
      rotationRate &&
      rotation &&
      acceleration
    ) {
      const newDataPoint = {
        "attitude.roll": rotation.alpha,
        "attitude.pitch": rotation.beta,
        "attitude.yaw": rotation.gamma,
        "gravity.x": accelerationIncludingGravity.x - acceleration.x,
        "gravity.y": accelerationIncludingGravity.y - acceleration.y,
        "gravity.z": accelerationIncludingGravity.z - acceleration.z,
        "rotationRate.x": rotationRate.alpha,
        "rotationRate.y": rotationRate.beta,
        "rotationRate.z": rotationRate.gamma,
        "userAcceleration.x": acceleration.x,
        "userAcceleration.y": acceleration.y,
        "userAcceleration.z": acceleration.z,
      };

      setMotionData((prevData) => [...prevData, newDataPoint]);
    }
  };

  return (
    <View className="flex-1 justify-between px-5 mt-14">
      {/* Display response data */}
      {responseData && (
        <View className="items-center text-3xl">
          <Text>Analysis Results</Text>
          {/* Check if evaluation_results exists */}
          {responseData.evaluation_results && (
            <View className="flex-col">
              <View className="flex-row justify-between">
                <Text className="text-3xl">
                  You are{" "}
                  <Text className="font-bold">
                    {responseData.evaluation_results.actual_similarity_percentage.toFixed(
                      2
                    )}
                    %
                  </Text>{" "}
                  recovered
                </Text>
              </View>

              {/* <View className="flex-row justify-between">
                <Text>Stage: </Text>
                <Text>
                  {responseData.evaluation_results.recovery_category_by_stage}
                </Text>
              </View> */}
            </View>
          )}
        </View>
      )}
      {subscription ? (
        <View className="my-3 items-center gap-3">
          {/* Displaying Device Motion */}
          {/* <View className="my-3 items-center gap-3">
            <Text className="text-center">Device Motion</Text>
            <View className="flex-row gap-4">
              <View>
                <Text className="text-center">Acceleration</Text>
                <Text className="text-center">x: {acceleration.x}</Text>
                <Text className="text-center">y: {acceleration.y}</Text>
                <Text className="text-center">z: {acceleration.z}</Text>
              </View>
              <View>
                <Text className="text-center">Rotation Rate</Text>
                <Text className="text-center">alpha: {rotationRate.alpha}</Text>
                <Text className="text-center">beta: {rotationRate.beta}</Text>
                <Text className="text-center">gamma: {rotationRate.gamma}</Text>
              </View>
            </View>
            <View className="flex-row gap-4">
              <View>
                <Text className="text-center">Rotation</Text>
                <Text className="text-center">roll: {rotation.roll}</Text>
                <Text className="text-center">pitch: {rotation.pitch}</Text>
                <Text className="text-center">yaw: {rotation.yaw}</Text>
              </View>
              <View>
                <Text className="text-center">User Acceleration</Text>
                <Text className="text-center">x: {userAcceleration.x}</Text>
                <Text className="text-center">y: {userAcceleration.y}</Text>
                <Text className="text-center">z: {userAcceleration.z}</Text>
              </View>
            </View>
          </View> */}

          <TouchableOpacity
            onPress={_unsubscribe}
            className="flex items-center bg-indigo-200 rounded-2xl w-40 py-3"
          >
            <Text>Off</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePost}
            className="flex items-center bg-indigo-200 rounded-2xl w-40 py-3"
          >
            <Text>POST</Text>
          </TouchableOpacity>
          <Text className="text-center my-5">Sensing Data...</Text>
        </View>
      ) : (
        <View className="my-3 items-center gap-3">
          <TouchableOpacity
            onPress={_subscribe}
            className="flex items-center bg-indigo-200 rounded-2xl w-40 py-3"
          >
            <Text>On</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePost}
            className="flex items-center bg-indigo-200 rounded-2xl w-40 py-3"
          >
            <Text>POST</Text>
          </TouchableOpacity>

          <Text className="text-center my-5">Not Sensing Data</Text>
        </View>
      )}
    </View>
  );
}
