import { router } from "expo-router";
import { useQuery } from "@apollo/client";

import { GET_CLIENTS } from "@/queries/clientQueries";
import ScreenLayout from "@/layouts/ScreenLayout";
import { DefaultFlatList, DefaultRenderItem } from "@/components/DefaultFlatList";

export default function ClientsScreen() {
  const { data, loading, error, refetch } = useQuery(GET_CLIENTS);

  function onGoToClientDetails(clientId: string) {
    router.push(`/client/${clientId}`);
  }

  function onGoToAddClient() {
    router.push("/client/new");
  }

  function renderClientItem({ item }: typeof data) {
    return <DefaultRenderItem
      item={{ title: item.name, subtitle: item.email }}
      onPress={() => onGoToClientDetails(item.id)}
    />;
  }

  return (
    <ScreenLayout
      screenTitle="Clients"
      addEntryButton={{
        onPress: onGoToAddClient,
        title: "Add Client",
      }}
    >
      <DefaultFlatList
        data={data?.clients}
        onRefresh={refetch}
        refreshing={loading}
        keyExtractor={(client) => client.id}
        renderItem={renderClientItem}
        error={error}
      />
    </ ScreenLayout>
  );
}
