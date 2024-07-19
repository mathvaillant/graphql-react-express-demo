import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { PROJECT_STATUS } from "../constants";
import { PickerIOS } from "@react-native-picker/picker";
import { ADD_PROJECT } from "@/mutations/ProjectMudations";
import { useMutation } from "@apollo/client";
import { GET_PROJECTS } from "@/queries/projectQueries";
import { Button } from "@/components/Button";
import { GET_CLIENT } from "@/queries/clientQueries";

export default function NewProjectScreen() {
  const { setOptions } = useNavigation();
  const { clientId, clientName } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(PROJECT_STATUS.OPEN);

  const [addProject, { data, error, loading }] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    refetchQueries: [{ query: GET_PROJECTS }, { query: GET_CLIENT, variables: { id: clientId } }],
    onCompleted: router.back,
    onError: (error) => Alert.alert(error.message),
  });

  function onSave() {
    if (!name.length || !description.length) {
      return Alert.alert("Please fill in all fields.");
    }
    addProject();
  }

  useEffect(() => {
    setOptions({ headerTitle: clientName });
  }, [clientName]);

  return (
    <VStack m={20} flex={1} gap={30}>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Name</Text>
        <Input
          value={name}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Description</Text>
        <Input
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Status</Text>
        <PickerIOS
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue as PROJECT_STATUS)}
          style={{ height: 48, width: "100%" }}
        >
          <PickerIOS.Item label="Open" value={PROJECT_STATUS.OPEN} />
          <PickerIOS.Item label="In Progress" value={PROJECT_STATUS.IN_PROGRESS} />
          <PickerIOS.Item label="Completed" value={PROJECT_STATUS.COMPLETED} />
        </PickerIOS>
      </VStack>

      <Button mt={"auto"} isLoading={loading} disabled={loading} onPress={onSave}>
        Save
      </Button>

    </VStack>
  );
}
