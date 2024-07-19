import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { ADD_CLIENT } from "@/mutations/ClientMutations";
import { useMutation } from "@apollo/client";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export default function NewClientScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient, { data, loading, }] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      cache.modify({
        fields: {
          clients(existingClients = []) {
            return [addClient, ...existingClients];
          }
        }
      });
    },
    onCompleted: router.back,
    onError: (error) => Alert.alert(error.message),
  });

  function onSave() {
    if (!name.length || !email.length || !phone.length) {
      return Alert.alert("Please fill in all fields.");
    }
    addClient();
  }

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
        <Text ml={10} fontSize={14} color="gray">Email</Text>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">Phone</Text>
        <Input
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>

      <Button mt={"auto"} isLoading={loading} disabled={loading} onPress={onSave}>
        Save
      </Button>

    </VStack>
  );
}
