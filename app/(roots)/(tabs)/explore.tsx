//app\(roots)\(tabs)\explore.tsx

import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";

import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";

const Explore = () => {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter ?? "", // Avoid undefined error
      query: params.query ?? "",
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter ?? "", // Fix potential issue
      query: params.query ?? "",
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={properties}
        numColumns={2}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={{ paddingBottom: 32 }}
        columnWrapperStyle={{ flex: 1, gap: 5, paddingHorizontal: 5 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color="#0061FF"
              style={{ marginTop: 5 }}
            />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={() => (
          <View style={{ paddingHorizontal: 5 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#D1E3FF",
                  borderRadius: 50,
                  width: 44,
                  height: 44,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.backArrow}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  fontFamily: "Rubik-Medium",
                  color: "#333",
                  marginRight: 8,
                }}
              >
                Search for Your Ideal Home
              </Text>

              <Image source={icons.bell} style={{ width: 24, height: 24 }} />
            </View>

            <Search />

            <View style={{ marginTop: 10 }}>
              <Filters />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Rubik-Bold",
                  color: "#333",
                  marginTop: 10,
                }}
              >
                Found {properties?.length ?? 0} Properties
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Explore;
