import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DeviceMotion } from "expo-sensors";
import { router } from "expo-router";
import * as FileSystem from "expo-file-system";
import axios from "axios";

export default function Dashboard() {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [rotationRate, setRotationRate] = useState({
    alpha: null,
    beta: null,
    gamma: null,
  });
  const [rotation, setRotation] = useState({ roll: 0, pitch: 0, yaw: 0 });
  const [userAcceleration, setUserAcceleration] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => DeviceMotion.setUpdateInterval(1000);
  const _fast = () => DeviceMotion.setUpdateInterval(2000);

  const _subscribe = () => {
    setSubscription(DeviceMotion.addListener(onDeviceMotionChange));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };
  const handleHome = () => {
    router.replace("/home");
  };

  const handlePost = async () => {
    const gravity = {
      x: acceleration.x - userAcceleration.x,
      y: acceleration.y - userAcceleration.y,
      z: acceleration.z - userAcceleration.z,
    };

    const data = {
      "attitude.roll": rotation.roll,
      "attitude.pitch": rotation.pitch,
      "attitude.yaw": rotation.yaw,
      "gravity.x": gravity.x,
      "gravity.y": gravity.y,
      "gravity.z": gravity.z,
      "rotationRate.x": rotationRate.alpha,
      "rotationRate.y": rotationRate.beta,
      "rotationRate.z": rotationRate.gamma,
      "userAcceleration.x": userAcceleration.x,
      "userAcceleration.y": userAcceleration.y,
      "userAcceleration.z": userAcceleration.z,
    };

    const apiUrl = "http://140.238.158.223:8080/analyze-data";
    try {
      const response = await axios.post(apiUrl, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveDataToCSV = async (data) => {
    const { acceleration, rotationRate, rotation, userAcceleration } = data;
    const csvData = `timestamp,acceleration_x,acceleration_y,acceleration_z,rotation_rate_alpha,rotation_rate_beta,rotation_rate_gamma,rotation_roll,rotation_pitch,rotation_yaw,user_acceleration_x,user_acceleration_y,user_acceleration_z\n`;
    const rowData = `${new Date().getTime()},${acceleration.x},${
      acceleration.y
    },${acceleration.z},${rotationRate.alpha},${rotationRate.beta},${
      rotationRate.gamma
    },${rotation.roll},${rotation.pitch},${rotation.yaw},${
      userAcceleration.x
    },${userAcceleration.y},${userAcceleration.z}\n`;

    const csvFilePath = FileSystem.documentDirectory + "motion_data.csv";

    try {
      await FileSystem.writeAsStringAsync(csvFilePath, csvData, {
        encoding: FileSystem.EncodingType.UTF8,
        append: !!(await FileSystem.getInfoAsync(csvFilePath)).exists,
      });
      await FileSystem.appendAsStringAsync(csvFilePath, rowData, {
        encoding: FileSystem.EncodingType.UTF8,
      });
    } catch (error) {
      console.error("Error writing to CSV:", error);
    }
  };

  const onDeviceMotionChange = (event) => {
    const {
      acceleration,
      rotationRate,
      rotation,
      accelerationIncludingGravity,
    } = event;
    console.log(event);

    if (accelerationIncludingGravity) {
      setAcceleration(accelerationIncludingGravity);
    }

    if (rotationRate) {
      setRotationRate(rotationRate);
    }

    if (rotation) {
      setRotation({
        roll: rotation.alpha,
        pitch: rotation.beta,
        yaw: rotation.gamma,
      });
    }

    if (acceleration) {
      setUserAcceleration(acceleration);
    }
  };

  // useEffect(() => {
  //   _subscribe();
  //   return () => _unsubscribe();
  // }, []);

  return (
    <View className="flex flex-1 justify-center px-5">
      {subscription ? (
        <View className="my-3 items-center gap-3">
          <Text className="text-center my-5">Sensing Data...</Text>

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
            onPress={_slow}
            className="flex items-center bg-indigo-200 rounded-2xl w-40 py-3"
          >
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={_fast}
            className="flex items-center bg-indigo-200 rounded-2xl w-40 py-3"
          >
            <Text>Fast</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleHome}
            className="flex items-center bg-indigo-200 rounded-2xl w-40 py-3"
          >
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePost}
            className="flex items-center bg-indigo-200 rounded-2xl w-40 py-3"
          >
            <Text>POST</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="my-3 items-center gap-3">
          <Text className="text-center my-5">Not Sensing Data</Text>
          <TouchableOpacity
            onPress={_subscribe}
            className="flex items-center bg-indigo-200 rounded-2xl w-40 py-3"
          >
            <Text>On</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleHome}
            className="flex items-center bg-indigo-200 rounded-2xl w-40 py-3"
          >
            <Text>Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
