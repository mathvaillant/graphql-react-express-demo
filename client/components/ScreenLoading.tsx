import { ActivityIndicator } from "react-native";
import { VStack } from "./VStack";

export default function ScreenLoading() {
  return (
    <VStack flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator animating size="large" />
    </VStack>
  );
}
