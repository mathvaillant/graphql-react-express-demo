import { useMutation, useQuery } from "@apollo/client";

import { Text } from "@/components/Text";
import ScreenLayout from "@/layouts/ScreenLayout";
import { GET_CLIENT, GET_CLIENTS } from "@/queries/clientQueries";
import { router, useLocalSearchParams } from "expo-router";
import { VStack } from "@/components/VStack";
import { DELETE_CLIENT } from "@/mutations/ClientMutations";
import useHeaderDelete from "@/hooks/useHeaderDelete";
import ScreenLoading from "@/components/ScreenLoading";
import { Alert } from "react-native";
import { GET_PROJECTS } from "@/queries/projectQueries";
import { DefaultFlatList } from "@/components/DefaultFlatList";
import { STATUS_COLOR_MAP, STATUS_MAP } from "../../(projects)/constants";
import { Divider } from "@/components/Divider";
import { HStack } from "@/components/HStack";

export default function ClientDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data, loading, error } = useQuery(GET_CLIENT, {
    variables: { id },
    onError: (error) => Alert.alert(error.message, "", [
      { text: "OK", onPress: router.back },
    ]),
  });

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    onCompleted: router.back,
    onError: (error) => Alert.alert(error.message),
  });

  useHeaderDelete({
    onDelete: deleteClient,
    alertTitle: "Delete Client",
    alertMessage: "Are you sure you want to delete this client?",
  });

  function onGoToProjectDetails(projectId: string) {
    router.push(`/project/${projectId}`);
  }

  function renderItem({ item }: typeof data) {
    return (
      <HStack py={20} gap={10}>
        <Text bold>{item.name}</Text>
        <Text
          bold
          underline
          color={STATUS_COLOR_MAP[item.status]}>{STATUS_MAP[item.status]}
        </Text>
      </HStack>
    );
  }

  if (loading) return <ScreenLoading />;

  return (
    <ScreenLayout screenTitle={data?.client?.name}>
      <VStack>
        <Text bold my={10} color="darkgray">ID: #{data?.client?.id}</Text>
        <Text bold my={10} underline>Email: {data?.client?.email}</Text>
        <Text bold my={10}>Phone: {data?.client?.phone}</Text>
      </VStack>

      <Divider my={20} />

      <Text fontSize={26} bold>Projects</Text>
      <DefaultFlatList
        data={data?.client?.projects}
        refreshing={loading}
        keyExtractor={(project) => project.id}
        renderItem={renderItem}
        error={error}
      />
    </ScreenLayout>
  );
};
