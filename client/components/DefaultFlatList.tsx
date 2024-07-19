import React from "react";
import { FlatList as RNFlatList, FlatListProps, StyleProp, ViewStyle, TouchableOpacity, Dimensions } from "react-native";
import { HStack } from "./HStack";
import { VStack } from "./VStack";
import { TabBarIcon } from "./navigation/TabBarIcon";
import { Text } from "./Text";
import { Divider } from "./Divider";
import { ApolloError } from "@apollo/client";
import { Button } from "./Button";

interface DefaultFlatListProps<T> extends Omit<FlatListProps<T>, "style"> {
  error?: ApolloError;
  flatListStyle?: StyleProp<ViewStyle>;
  ListEmptyComponentProps?: {
    action?: {
      title: string;
      onPress: VoidFunction;
    };
  };
}

interface DefaultRenderItemProps<T> {
  item: T;
  onPress: VoidFunction;
}

export function DefaultFlatList<T>({ flatListStyle, ListEmptyComponentProps, ...restFlatListProps }: DefaultFlatListProps<T>) {
  return (
    <RNFlatList<T>
      style={flatListStyle}
      {...restFlatListProps}
      ItemSeparatorComponent={() => <Divider w={"auto"} h={1} />}
      ListEmptyComponent={() => ListEmptyComponent(restFlatListProps.error, ListEmptyComponentProps)}
    />
  );
}

function ListEmptyComponent(
  error?: ApolloError,
  { action }: DefaultFlatListProps<any>["ListEmptyComponentProps"] = {}
) {
  return (
    <VStack flex={1} justifyContent="center" alignItems="center" gap={20} mt={Dimensions.get("window").height / 4}>
      <TabBarIcon
        color={error ? "#fe5757" : "#999"}
        name={error ? "alert-circle" : "search"}
        size={40}
      />
      <Text fontSize={18} bold color={error ? "#fe5757" : "#999"}>
        {error ? error.message : "No data found"}
      </Text>

      {action && (
        <Button w={200} onPress={action.onPress}>
          <Text>{action.title}</Text>
        </Button>
      )}
    </VStack>
  );
}

export function DefaultRenderItem<T extends {
  title: string | JSX.Element,
  subtitle: string | JSX.Element,
}>({ item, onPress }: DefaultRenderItemProps<T>) {
  return (
    <TouchableOpacity onPress={onPress}>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        w={"auto"}
        h={80}
      >
        <VStack gap={5}>
          {typeof item.title === "string" ?
            <Text fontSize={18} bold>{item.title}</Text> : item.title
          }
          {typeof item.subtitle === "string" ?
            <Text color="#999" fontSize={14}>{item.subtitle}</Text> : item.subtitle
          }
        </VStack>
        <TabBarIcon name="chevron-forward" size={22} />
      </HStack>
    </TouchableOpacity>
  );
}
