import { View, Text, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useAuth } from "../context/authContext";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import MenuItem from "./menu-item";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Header() {
  const { user, logout } = useAuth();
  const { top } = useSafeAreaInsets();

  const handleLogout = async () => {
    await logout();
  };

  const handleDashboard = () => {
    router.replace("/dashboard");
    return;
  };
  const handleAccl = () => {
    router.replace("/accl-dashboard");
    return;
  };
  const handleGyro = () => {
    router.replace("/gyro-dashboard");
    return;
  };

  return (
    <View
      style={{ paddingTop: Platform.OS == "ios" ? top : top + 10 }}
      className="flex-row justify-between px-5 py-6 bg-indigo-400 rounded-b-3xl shadow-sm"
    >
      <View>
        <View className="flex-row gap-1">
          <Text style={{ fontSize: hp(2) }}>Welcome, </Text>
          <Text
            style={{ fontSize: hp(2) }}
            className="font-medium text-[#0D0D0D]"
          >
            {user?.username}!
          </Text>
        </View>
      </View>

      <View>
        <Menu>
          <MenuTrigger
            customStyles={{
              triggerWrapper: {
                // trigger wrapper style
              },
            }}
          >
            <Image
              style={{ height: hp(4), aspectRatio: 1, borderRadius: 100 }}
              source="https://github.com/shadcn.png"
              placeholder={blurhash}
              contentFit="cover"
              transition={1000}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuItem
              text="Dashboard"
              action={handleDashboard}
              value={null}
              icon={<AntDesign name="profile" size={24} color="black" />}
            />
            <MenuItem
              text="Acceleration"
              action={handleAccl}
              value={null}
              icon={<AntDesign name="profile" size={24} color="black" />}
            />
            <MenuItem
              text="Gyroscope"
              action={handleGyro}
              value={null}
              icon={<AntDesign name="profile" size={24} color="black" />}
            />
            <MenuItem
              text="Sign Out"
              action={handleLogout}
              value={null}
              icon={<AntDesign name="logout" size={24} color="black" />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}
