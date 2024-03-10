import { Slot, useSegments, useRouter } from "expo-router";
import { AuthContextProvider, useAuth } from "../context/authContext";
import "../global.css";
import { useEffect } from "react";

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
      router.replace("dashboard");
    } else if (isAuthenticated == false) {
      // redirect to signIn page
      router.replace("signIn");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}
