import { router } from "expo-router";
import { useQuery } from "@apollo/client";

import { GET_PROJECTS } from "@/queries/projectQueries";
import ScreenLayout from "@/layouts/ScreenLayout";
import { DefaultFlatList, DefaultRenderItem } from "@/components/DefaultFlatList";
import { Text } from "@/components/Text";
import { STATUS_COLOR_MAP, STATUS_MAP } from "./constants";

export default function ProjectsScreen() {
  const { data, loading, error, refetch } = useQuery(GET_PROJECTS);

  function onGoToProjectDetails(projectId: string) {
    router.push(`/project/${projectId}`);
  }

  function onGoToAddProject() {
    router.push("/selectClient");
  }

  function renderProjectItem({ item }: typeof data) {
    return <DefaultRenderItem
      onPress={() => onGoToProjectDetails(item.id)}
      item={{
        title: item.name,
        subtitle: (
          <Text
            bold
            underline
            color={STATUS_COLOR_MAP[item.status]}>{STATUS_MAP[item.status]}
          </Text>
        ),
      }}
    />;
  }

  return (
    <ScreenLayout
      screenTitle="Projects"
      addEntryButton={{
        onPress: onGoToAddProject,
        title: "Add Project",
      }}
    >
      <DefaultFlatList
        data={data?.projects}
        onRefresh={refetch}
        refreshing={loading}
        keyExtractor={(project) => project.id}
        renderItem={renderProjectItem}
        error={error}
      />
    </ ScreenLayout>
  );
}
