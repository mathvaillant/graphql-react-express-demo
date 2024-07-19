import { Text } from "@/components/Text";
import { Stack } from "expo-router";

export default function ClientsLayout() {
  return (
    <Stack screenOptions={{
      headerBackTitle: "Clients",
      headerTitle: () => <Text color="white" fontSize={22} bold>MGMT LDTA</Text>,
      headerStyle: { backgroundColor: "black" },
      headerTintColor: "white"
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="client/new"
        options={{ headerTitle: "" }}
      />
      <Stack.Screen
        name="client/[id]"
        options={{ headerTitle: "" }}
      />
    </Stack>
  );
}
