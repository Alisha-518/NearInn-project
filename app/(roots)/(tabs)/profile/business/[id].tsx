import { View, Text, Button } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function BusinessDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Get business ID from the URL

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-4">Business Details - {id}</Text>

      {/* Business Information */}
      <Button
        title="Edit Business"
        onPress={() => router.push(`/profile/business/form?id=${id}`)}
      />

      {/* Product Section */}
      <Text className="text-lg font-bold mt-6 mb-2">Products</Text>
      <Button
        title="Product 1"
        onPress={() => router.push("/profile/product/1")}
      />
      <Button
        title="Product 2"
        onPress={() => router.push("/profile/product/2")}
      />
      <Button
        title="Add New Product"
        onPress={() => router.push("/profile/product/form")}
      />
    </View>
  );
}
