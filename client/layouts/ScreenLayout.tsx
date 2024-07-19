import { Button } from "@/components/Button";
import { HStack } from "@/components/HStack";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { PropsWithChildren } from "react";

interface ScreenLayoutProps extends PropsWithChildren<{}> {
  screenTitle: string;
  addEntryButton?: {
    onPress: () => void;
    title: string;
  };
}

export default function ScreenLayout({ screenTitle, addEntryButton, children }: ScreenLayoutProps) {
  return (
    <VStack flex={1} p={20}>
      <HStack justifyContent="space-between" alignItems="center" mb={20}>
        <Text fontSize={32} bold>{screenTitle}</Text>
        {addEntryButton && (
          <Button h={40} style={{ backgroundColor: "#27a102" }} onPress={addEntryButton.onPress}>
            <HStack h={40} gap={5} justifyContent="center">
              <TabBarIcon color="white" name="add-circle" size={20} />
              <Text bold mt={1} fontSize={15} color="white">{addEntryButton.title}</Text>
            </HStack>
          </Button>
        )}
      </HStack>
      {children}
    </VStack>
  );
}
