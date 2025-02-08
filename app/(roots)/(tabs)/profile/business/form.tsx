//app\(roots)\(tabs)\profile\business\form.tsx
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import BusinessForm, { BusinessFormValues } from "../components/BusinessForm";
import { createProperty } from "../../../../../lib/appwriteDatabase"; // Import Appwrite function
import { getCurrentUser } from "../../../../../lib/appwrite"; // ✅ Import user authentication
import { useGlobalContext } from "@/lib/global-provider"; // ✅ Import Global Context

const emptyBusinessFormValues: BusinessFormValues = {
  name: "",
  type: "commercial", // Default selection (can be changed)
  description: "",
  address: "",
  price: undefined, // Prevents 0 from showing
  area: undefined,
  bedrooms: undefined,
  bathrooms: undefined,
  rating: undefined,
  facilities: "wifi",
  image: "",
  geolocation: "",
  agent: "",
  //gallery: "",
};

export default function AddEditBusiness() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { setRefreshTrigger } = useGlobalContext(); // ✅ Access global refresh state

  const handleSubmit = async (data: BusinessFormValues) => {
    console.log(id ? "Updating Business" : "Adding Business", data);

    // ✅ Fetch current user & ensure user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      Alert.alert(
        "Authentication Error",
        "Please log in before creating a business."
      );
      return;
    }

    // Convert undefined to valid numbers (e.g., 0)
    const sanitizedData = {
      ...data,
      price: data.price ?? 0,
      area: data.area ?? 0,
      bedrooms: data.bedrooms ?? 0,
      bathrooms: data.bathrooms ?? 0,
      rating: data.rating ?? 0,
      authId: user.$id, // ✅ Required field for authentication
    };

    try {
      if (id) {
        console.log("Updating Property - ID:", id);
        // await updateProperty(id, sanitizedData);
      } else {
        console.log("📌 Calling createProperty()...");
        const result = await createProperty(sanitizedData);
        console.log("✅ Property Created:", result);
      }

      // ✅ Trigger global state update before navigating back
      setRefreshTrigger((prev) => !prev);

      // ✅ Navigate back to profile page
      router.replace("/profile");
    } catch (error) {
      console.error("❌ Error submitting business:", error);
      Alert.alert("Error", "Failed to save business. Please try again.");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <Text className="text-2xl font-bold p-6">
        {id ? "Edit Business" : "Add New Business"}
      </Text>
      <BusinessForm
        onSubmit={handleSubmit}
        defaultValues={
          id
            ? {
                name: "Example Business",
                type: "commercial",
                description: "A sample business",
                address: "123 Main St",
                price: 1000,
                area: 500.5,
                bedrooms: 2,
                bathrooms: 1,
                rating: 4.5,
                facilities: "wifi",
                image: "https://example.com/image.jpg",
                geolocation: "45.76,-73.45",
                agent: "agent123",
                //gallery: "gallery123",
              }
            : emptyBusinessFormValues
        }
      />
    </KeyboardAvoidingView>
  );
}
