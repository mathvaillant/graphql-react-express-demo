import { router } from 'expo-router';
import ScreenLayout from '@/layouts/ScreenLayout';
import { DefaultFlatList, DefaultRenderItem } from '@/components/DefaultFlatList';
import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '@/queries/clientQueries';

export default function SelectClient() {
  const { data, loading, error, refetch } = useQuery(GET_CLIENTS);

  function renderClientItem({ item }: typeof data) {
    return <DefaultRenderItem
      item={{ title: item.name, subtitle: item.email }}
      onPress={() => router.replace(`/project/new?clientId=${item.id}&clientName=${item.name}`)}
    />;
  }

  return (
    <ScreenLayout screenTitle="Select Client">
      <DefaultFlatList
        data={data?.clients}
        onRefresh={refetch}
        refreshing={loading}
        keyExtractor={(client) => client.id}
        renderItem={renderClientItem}
        error={error}
        ListEmptyComponentProps={{
          action: {
            title: "Create Client",
            onPress: () => {
              router.dismiss();
              router.replace("../(clients)/client/new");
            },
          },
        }}
      />
    </ ScreenLayout>
  );
}
