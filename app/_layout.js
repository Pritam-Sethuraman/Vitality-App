import { Stack, useSegments, useRouter, Slot } from "expo-router";
import { AuthContextProvider, useAuth } from "../context/authContext";
import "../global.css";
import { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // check if user is authenticated
    if (typeof isAuthenticated == "undefined") return;

    const inApp = segments[0] == "(app)";
    if (isAuthenticated && !inApp) {
      // redirect to home
      router.replace("home");
    } else if (isAuthenticated == false) {
      // redirect to signIn page
      router.replace("signIn");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  );
}
