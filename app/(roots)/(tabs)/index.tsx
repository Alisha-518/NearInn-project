//app\(roots)\(tabs)\index.tsx

/**
 * Home Screen - Displays the homepage for the app.
 * Features:
 * 1. Shows a list of featured properties.
 * 2. Displays recommended properties based on filters and user searches.
 * 3. Includes a search bar and filtering options.
 * 4. Provides navigation to detailed property views.
 */

import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native"; // Core React Native components.
import { useEffect } from "react"; // For managing side effects like API calls.
import { router, useLocalSearchParams } from "expo-router"; // For routing/navigation.
import { SafeAreaView } from "react-native-safe-area-context"; // To ensure safe usage of device-specific areas.

import icons from "@/constants/icons"; // Icon assets.

import Search from "@/components/Search"; // Search bar component.
import Filters from "@/components/Filters"; // Filter component for recommendations.
import NoResults from "@/components/NoResults"; // Component to display when no data is found.
import { Card, FeaturedCard } from "@/components/Cards"; // Card components for property listings.

import { useAppwrite } from "@/lib/useAppwrite"; // Custom hook for Appwrite API calls.
import { useGlobalContext } from "@/lib/global-provider"; // Access global context (e.g., user info).
import { getLatestProperties, getProperties } from "@/lib/appwrite"; // API functions for fetching property data.

const Home = () => {
  const { user } = useGlobalContext(); // Retrieve the current user's information.

  // Get search and filter parameters from the route (URL query parameters).
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  // Fetch the latest properties for the "Featured" section.
  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  // Fetch properties based on the current filters and query.
  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!, // Filter from URL query.
      query: params.query!, // Search query from URL query.
      limit: 6, // Limit the number of results to 6.
    },
    skip: true, // Skip the initial fetch until explicitly called.
  });

  // Refetch property data whenever query or filter parameters change.
  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    });
  }, [params.filter, params.query]);

  // Navigate to the detailed property page when a card is pressed.
  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className="h-full bg-white">
      {/* FlatList to display recommended properties in a grid layout */}
      <FlatList
        data={properties} // Data source for the FlatList.
        numColumns={2} // Number of columns in the grid layout.
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )} // Render each property as a Card.
        keyExtractor={(item) => item.$id} // Unique key for each item.
        contentContainerClassName="pb-32" // Adds padding at the bottom for better spacing.
        columnWrapperClassName="flex gap-5 px-5" // Adjusts spacing between columns.
        showsVerticalScrollIndicator={false} // Hides the vertical scroll indicator.
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults /> // Show "No Results" when there's no data.
          )
        }
        ListHeaderComponent={() => (
          <View className="px-5">
            {/* Header Section: User avatar and greeting */}
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row">
                <Image
                  source={{ uri: user?.avatar }} // User's avatar.
                  className="size-12 rounded-full" // Circle-shaped avatar.
                />

                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    {user?.name} {/* User's name. */}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
              {/* Notification icon */}
            </View>

            {/* Search Bar */}
            <Search />

            {/* Featured Properties Section */}
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Loading spinner or featured property list */}
              {latestPropertiesLoading ? (
                <ActivityIndicator size="large" className="text-primary-300" />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults /> // Show "No Results" when no featured properties are found.
              ) : (
                <FlatList
                  data={latestProperties} // Featured properties data source.
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.$id)} // Navigate to the property details page.
                    />
                  )}
                  keyExtractor={(item) => item.$id} // Unique key for each item.
                  horizontal // Horizontal scroll for featured properties.
                  showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator.
                  contentContainerClassName="flex gap-5 mt-5"
                />
              )}
            </View>

            {/* Recommended Properties Section */}
            <View className="mt-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Filter component for refining recommendations */}
              <Filters />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
