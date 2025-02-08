//app\(roots)\(tabs)\profile\product\form.tsx
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ProductForm, { ProductFormValues } from "../components/ProductForm";
import { createProduct, updateProduct } from "@/lib/appwriteDatabase"; // ✅ Import Appwrite functions

const emptyProductFormValues: ProductFormValues = {
  name: "",
  type: "Other", // Default selection
  price: 0,
  properties: "", // ✅ Will be auto-filled with businessId
};

export default function AddEditProduct() {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id; // ✅ Ensure `id` is a string
  const businessId = Array.isArray(params.businessId)
    ? params.businessId[0]
    : params.businessId; // ✅ Ensure `businessId` is a string
  const productId = Array.isArray(params.id) ? params.id[0] : params.id; // ✅ Ensure `id` is a string
  const router = useRouter();
  const handleSubmit = async (data: ProductFormValues) => {
    console.log(productId ? "Updating Product" : "Adding Product", data);

    try {
      if (id) {
        console.log("Updating Product - ID:", id);
        await updateProduct(id, data);
      } else {
        console.log("📌 Calling createProduct()...");
        const newProduct = await createProduct({
          ...data,
          properties: businessId,
        }); // ✅ Link product to business
        console.log("✅ Product Created:", newProduct);
      }

      // ✅ Navigate back & pass refresh flag
      router.push(`/profile/business/${businessId}?refresh=true`);
    } catch (error) {
      console.error("❌ Error submitting product:", error);
      Alert.alert("Error", "Failed to save product. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <Text className="text-2xl font-bold p-6">
        {productId ? "Edit Product" : "Add New Product"}
      </Text>
      <ProductForm
        onSubmit={handleSubmit}
        defaultValues={
          productId
            ? {
                name: "Example",
                type: "Other",
                price: 100,
                properties: businessId || "",
              }
            : { ...emptyProductFormValues, properties: businessId || "" } // ✅ Pre-fill properties with businessId
        }
      />
    </KeyboardAvoidingView>
  );
}
