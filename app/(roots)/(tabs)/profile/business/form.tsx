import { View, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import BusinessForm from "../components/BusinessForm";

export default function AddEditBusiness() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const handleSubmit = () => {
    console.log(id ? "Updating Business" : "Adding Business");
    router.back(); // Go back after saving
  };

  return (
    <View className="flex-1 bg-white">
      <Text className="text-2xl font-bold p-6">
        {id ? "Edit Business" : "Add New Business"}
      </Text>
      <BusinessForm
        onSubmit={handleSubmit}
        defaultValues={
          id ? { name: "Example Business", category: "Category A" } : {}
        }
      />
    </View>
  );
}
