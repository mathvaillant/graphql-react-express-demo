import { useEffect } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { HStack } from "@/components/HStack";
import { Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import { Text } from "@/components/Text";

interface Props {
  onDelete: VoidFunction;
  alertTitle: string;
  alertMessage: string;
}

export default function useHeaderDelete({ onDelete, alertMessage, alertTitle }: Props) {
  const { setOptions } = useNavigation();

  function onConfirmDelete() {
    Alert.alert(
      alertTitle,
      alertMessage,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: onDelete,
        },
      ]
    );
  };

  useEffect(() => {
    setOptions({ headerRight: () => headerRight(onConfirmDelete) });
  }, []);
}


const headerRight = (onConfirm: VoidFunction) => (
  <TouchableOpacity onPress={onConfirm}>
    <HStack gap={5} justifyContent="center" alignItems="center">
      <Text color="red">Delete</Text>
      <TabBarIcon
        name="trash"
        color="red"
        size={24}
      />
    </HStack>
  </TouchableOpacity>
);
