import { Text } from "@/components/Text";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { ComponentProps } from "react";

export default function TabLayout() {
  const tabs = [
    {
      name: "(clients)",
      displayName: "Clients",
      icon: "person",
    },
    {
      name: "(projects)",
      displayName: "Projects",
      icon: "file-tray-stacked",
    },
  ];

  return (
    <Tabs>
      {tabs.map(tab => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            headerShown: false,
            tabBarLabel: ({ focused }) => (
              <Text color={focused ? "black" : "gray"} fontSize={14}>
                {tab.displayName}
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                size={26}
                name={tab.icon as ComponentProps<typeof Ionicons>["name"]}
                color={focused ? "black" : "gray"}
              />
            )
          }}
        />
      ))}
    </Tabs>
  );
}
