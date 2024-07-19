import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:3004/graphql",
  cache,
});

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </GestureHandlerRootView>
    </ApolloProvider >
  );
}
