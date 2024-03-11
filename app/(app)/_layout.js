import { Stack } from "expo-router";
import Header from "../../components/header";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          header: () => <Header />,
        }}
      />
    </Stack>
  );
}
