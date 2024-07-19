import { Text } from "@/components/Text";
import { Stack } from "expo-router";

export default function ProjectsLayout() {
  return (
    <Stack screenOptions={{
      headerBackTitle: "Projects",
      headerTitle: () => <Text color="white" fontSize={22} bold>MGMT LDTA</Text>,
      headerStyle: { backgroundColor: "darkblue" },
      headerTintColor: "white"
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="project/new"
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="selectClient"
        options={{
          headerShown: false,
          presentation: "formSheet",
        }}
      />
      <Stack.Screen
        name="project/[id]"
        options={{ headerTitle: "" }}
      />
    </Stack>
  );
}
