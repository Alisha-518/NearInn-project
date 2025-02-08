// Components: UserProfile, UserBusinesses, AddBusinessButton

//app\(roots)\(tabs)\profile\index.tsx

import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider"; // Access global context
import { getUserBusinesses } from "@/lib/appwriteDatabase"; // ✅ Function to fetch businesses

export default function ProfilePage() {
  const router = useRouter();
  const { user, refreshTrigger } = useGlobalContext(); // ✅ Listen to refreshTrigger
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch businesses only when user ID is available
  useEffect(() => {
    if (user?.$id) {
      fetchBusinesses(user.$id);
    }
  }, [user, refreshTrigger]); // ✅ Trigger refresh when `refreshTrigger` changes

  const fetchBusinesses = async (userId: string) => {
    try {
      setLoading(true);
      const data = await getUserBusinesses(userId); // ✅ userId is guaranteed to be a string
      setBusinesses(data);
    } catch (error) {
      console.error("❌ Error fetching businesses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 p-6 bg-white">
      {/* 1st Section: User Info */}
      <View className="flex-row items-center mb-6 space-x-4">
        <Image
          source={{ uri: user?.avatar || "https://via.placeholder.com/100" }} // Fallback image
          className="w-16 h-16 rounded-full"
        />
        <View>
          <Text className="text-xl font-bold">
            {user?.name || "Guest User"}
          </Text>
          <Text className="text-gray-600">
            {user?.email || "No email available"}
          </Text>
        </View>
      </View>

      {/* 2nd Section: Edit Profile */}
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg mb-6"
        onPress={() => router.push("/profile/edit")}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Your Profile
        </Text>
      </TouchableOpacity>

      {/* 3rd Section: Business List */}
      <View className="mb-6">
        <Text className="text-lg font-bold mb-3">Your Businesses</Text>

        {/* ✅ Loading Indicator */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : businesses.length === 0 ? (
          <Text className="text-gray-500">No businesses found.</Text> // ✅ Wrapped in <Text>
        ) : (
          <FlatList
            data={businesses}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="p-3 border rounded-lg mb-2"
                onPress={() => router.push(`/profile/business/${item.$id}`)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        {/* Add New Business Button */}
        <TouchableOpacity
          className="p-3 bg-green-500 rounded-lg"
          onPress={() => router.push("/profile/business/form")}
        >
          <Text className="text-white text-center">Add New Business</Text>
        </TouchableOpacity>
      </View>

      {/* 4th Section: Logout */}
      <TouchableOpacity className="mt-auto">
        <Text className="text-red-500 text-center text-lg font-bold">
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
