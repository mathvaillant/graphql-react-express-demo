import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import ScreenLayout from "@/layouts/ScreenLayout";
import { GET_PROJECT, GET_PROJECTS } from "@/queries/projectQueries";
import { useMutation, useQuery } from "@apollo/client";
import { router, useLocalSearchParams } from "expo-router";
import { STATUS_COLOR_MAP, STATUS_MAP } from "../constants";
import useHeaderDelete from "@/hooks/useHeaderDelete";
import { Alert } from "react-native";
import { DELETE_PROJECT } from "@/mutations/ProjectMudations";
import ScreenLoading from "@/components/ScreenLoading";

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data, error, loading } = useQuery(GET_PROJECT, {
    variables: { id },
    onError: (error) => Alert.alert(error.message, "", [
      { text: "OK", onPress: router.back },
    ]),
  });

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id },
    update(cache) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: projects.filter((p) => p.id !== id) },
      });
    },
    onCompleted: router.back,
    onError: (error) => Alert.alert(error.message),
  });

  useHeaderDelete({
    onDelete: deleteProject,
    alertTitle: "Delete Client",
    alertMessage: "Are you sure you want to delete this client?",
  });

  if (loading) return <ScreenLoading />;

  return (
    <ScreenLayout screenTitle={data?.project?.name}>
      <VStack gap={5}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            padding: 5,
            textAlign: "center",
            backgroundColor: STATUS_COLOR_MAP[data?.project?.status],
          }}>
          {STATUS_MAP[data?.project?.status]}
        </Text>
        <Text my={10} color="darkgray">ID: #{data?.project?.id}</Text>
        <Text bold my={10}>{data?.project?.description}</Text>

        <Text bold mt={20} fontSize={28}>Client</Text>
        <Text my={10} color="darkgray">ID: #{data?.project?.client?.id}</Text>
        <Text my={10}>Name: {data?.project?.client?.name}</Text>
        <Text my={10} underline>Email: {data?.project?.client?.email}</Text>
        <Text my={10}>Phone: {data?.project?.client?.phone}</Text>
      </VStack>
    </ScreenLayout>
  );
}
