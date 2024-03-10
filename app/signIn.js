import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import Loading from "../components/loading";
import KeyboardView from "../components/keyboard-view";

export default function SignIn() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please fill all the required fields!");
      // Login Logic goes here
    }
  };

  return (
    <KeyboardView>
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
        className="flex-1 gap-12"
      >
        {/* Login Image */}
        <View className="items-center">
          <Image
            style={{ height: hp(35), marginBottom: 0 }}
            resizeMode="contain"
            source={require("../assets/images/login.png")}
          />
        </View>

        <View className="gap-10">
          <Text className="flex text-center justify-center text-3xl font-bold tracking-wider">
            Sign In
          </Text>

          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-3 px-4 bg-neutral-100 rounded-xl items-center"
            >
              {/* Icon and In put for email */}
              <FontAwesome name="envelope" size={24} color="black" />
              <TextInput
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Username or Email"
                keyboardType="email-address"
                placeholderTextColor={"gray"}
                autoCorrect={false}
                onChangeText={(value) => (emailRef.current = value)}
              />
            </View>
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-3 px-4 bg-neutral-100 rounded-xl items-center"
            >
              {/* Icon and In put for password */}
              <FontAwesome6 name="key" size={24} color="black" />
              <TextInput
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Password"
                keyboardType="default"
                placeholderTextColor={"gray"}
                autoCorrect={false}
                secureTextEntry
                onChangeText={(value) => (passwordRef.current = value)}
              />
            </View>
            <Text
              style={{ fontSize: hp(1.8) }}
              className="font-semibold text-right text-neutral-400"
            >
              Forgot password?
            </Text>
          </View>

          {/* Sign In Button */}
          <View>
            {isLoading ? (
              <View className="flex-row justify-center">
                <Loading size={hp(6)} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleLogin}
                style={{ height: hp(6.5) }}
                className="bg-indigo-400 rounded-2xl p-2 items-center justify-center"
              >
                <Text
                  style={{ fontSize: hp(2.7) }}
                  className="text-white font-bold tracking-wider"
                >
                  Sign In
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Sign Up Text */}
          <View className="flex-row justify-center gap-2">
            <Text
              style={{ fontSize: hp(1.8) }}
              className="font-semibold text-neutral-400"
            >
              Don't have an account?
            </Text>
            <Pressable onPress={() => router.push("signUp")}>
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-indigo-400"
              >
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardView>
  );
}
