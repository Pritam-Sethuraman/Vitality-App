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
import { useAuth } from "../context/authContext";

export default function SignUp() {
  const router = useRouter();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileUrlRef = useRef("");

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !profileUrlRef.current
    ) {
      Alert.alert("Sign Up", "Please fill all the required fields!");
      return;
    }
    setIsLoading(true);

    let res = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileUrlRef.current
    );
    setIsLoading(false);

    console.log("Got result: ", res);
    if (!res.success) {
      Alert.alert("Sign Up Error", res.msg);
    }
  };

  return (
    <KeyboardView>
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }}
        className="flex-1 gap-12"
      >
        {/* Register Image */}
        <View className="items-center">
          <Image
            style={{ height: hp(25), marginBottom: 0 }}
            resizeMode="contain"
            source={require("../assets/images/register.png")}
          />
        </View>

        <View className="gap-10">
          <Text className="flex text-center justify-center text-3xl font-bold tracking-wider">
            Sign Up
          </Text>

          <View className="gap-4">
            {/* Username */}
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-3 px-4 bg-neutral-100 rounded-xl items-center"
            >
              <FontAwesome6 name="user-large" size={24} color="black" />
              <TextInput
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Username"
                keyboardType="email-address"
                placeholderTextColor={"gray"}
                autoCorrect={false}
                onChangeText={(value) => (usernameRef.current = value)}
              />
            </View>

            {/* Email */}
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-3 px-4 bg-neutral-100 rounded-xl items-center"
            >
              <FontAwesome name="envelope" size={24} color="black" />
              <TextInput
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor={"gray"}
                autoCorrect={false}
                onChangeText={(value) => (emailRef.current = value)}
              />
            </View>

            {/* Password */}
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-3 px-4 bg-neutral-100 rounded-xl items-center"
            >
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

            {/* Profile URL */}
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-3 px-4 bg-neutral-100 rounded-xl items-center"
            >
              <FontAwesome6 name="image" size={24} color="black" />
              <TextInput
                className="flex-1 font-semibold text-neutral-700"
                placeholder="Profile URL"
                keyboardType="email-address"
                placeholderTextColor={"gray"}
                autoCorrect={false}
                onChangeText={(value) => (profileUrlRef.current = value)}
              />
            </View>
          </View>

          {/* Sign In Button */}
          <View>
            {isLoading ? (
              <View className="flex-row justify-center">
                <Loading size={hp(6)} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleRegister}
                style={{ height: hp(6.5) }}
                className="bg-indigo-400 rounded-2xl p-2 items-center justify-center"
              >
                <Text
                  style={{ fontSize: hp(2.7) }}
                  className="text-white font-bold tracking-wider"
                >
                  Register
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
              Already have an account?
            </Text>
            <Pressable onPress={() => router.push("signIn")}>
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-indigo-400"
              >
                Sign In
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardView>
  );
}
