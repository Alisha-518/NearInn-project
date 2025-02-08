//app\(roots)\(tabs)\profile\business\[id].tsx

import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  getBusinessById,
  getProductsByBusinessId,
} from "@/lib/appwriteDatabase"; // ✅ Fetch business & products

export default function BusinessDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const businessId = Array.isArray(params.id) ? params.id[0] : params.id; // ✅ Ensure businessId is a string
  const shouldRefresh = params.refresh === "true"; // ✅ Check if refresh flag is passed

  const [business, setBusiness] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch business details & products when the component mounts
  useEffect(() => {
    if (businessId) {
      fetchBusinessDetails(businessId);
      fetchProducts(businessId);
    }
  }, [businessId, shouldRefresh]); // ✅ Re-fetch when shouldRefresh changes

  const fetchBusinessDetails = async (id: string) => {
    try {
      const data = await getBusinessById(id); // ✅ Fetch business details
      setBusiness(data);
    } catch (error) {
      console.error("❌ Error fetching business:", error);
    }
  };

  const fetchProducts = async (id: string) => {
    try {
      setLoading(true);
      const data = await getProductsByBusinessId(id); // ✅ Fetch products linked to this business
      setProducts(data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 p-6 bg-white">
      {/* ✅ 1st Section: Business Info */}
      <View className="flex-row items-center mb-6 space-x-4">
        <Image
          source={{ uri: business?.image || "https://via.placeholder.com/100" }}
          className="w-16 h-16 rounded-full"
        />
        <View>
          <Text className="text-xl font-bold">
            {business?.name || "Business Name"}
          </Text>
          <Text className="text-gray-600">
            {business?.address || "No Address Available"}
          </Text>
        </View>
      </View>

      {/* ✅ 2nd Section: Edit Business */}
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg mb-6"
        onPress={() => router.push(`/profile/business/form?id=${businessId}`)}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Edit Business
        </Text>
      </TouchableOpacity>

      {/* ✅ 3rd Section: Products List */}
      <View className="mb-6">
        <Text className="text-lg font-bold mb-3">Products</Text>

        {/* ✅ Loading Indicator */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : products.length === 0 ? (
          <Text className="text-gray-500">No products found.</Text>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="p-3 border rounded-lg mb-2"
                onPress={() => router.push(`/profile/product/${item.$id}`)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        {/* ✅ Add New Product Button (Pass businessId for relationship) */}
        <TouchableOpacity
          className="p-3 bg-green-500 rounded-lg"
          onPress={() =>
            router.push(`/profile/product/form?businessId=${businessId}`)
          }
        >
          <Text className="text-white text-center">Add New Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
