import { useForm, Controller } from "react-hook-form";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ModalSelector from "react-native-modal-selector"; // For dropdowns

type ProductFormProps = {
  onSubmit: (data: ProductFormValues) => void;
  defaultValues?: ProductFormValues;
};

export type ProductFormValues = {
  name: string;
  type: string;
  price: number;
  properties: string; // Relationship ID to properties collection
};

// Sample Product Types for Dropdown
const productTypes = [
  { key: "Electronics", label: "Electronics" },
  { key: "Furniture", label: "Furniture" },
  { key: "Clothing", label: "Clothing" },
  { key: "Other", label: "Other" },
];

export default function ProductForm({
  onSubmit,
  defaultValues,
}: ProductFormProps) {
  const { control, handleSubmit } = useForm<ProductFormValues>({
    defaultValues,
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView className="p-6 bg-white">
        {/* Product Name */}
        <Controller
          control={control}
          name="name"
          rules={{ required: "Product name is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View>
              <TextInput
                placeholder="Product Name"
                value={value}
                onChangeText={onChange}
                className="border p-3 mb-4"
              />
              {error && <Text className="text-red-500">{error.message}</Text>}
            </View>
          )}
        />

        {/* Product Type */}
        <Controller
          control={control}
          name="type"
          rules={{ required: "Product type is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View>
              <ModalSelector
                data={productTypes}
                initValue="Select Product Type"
                onChange={(option) => onChange(option.key)}
                style={{
                  marginBottom: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                }}
              >
                <Text style={{ padding: 10, color: value ? "#000" : "#888" }}>
                  {value
                    ? productTypes.find((t) => t.key === value)?.label
                    : "Select Product Type"}
                </Text>
              </ModalSelector>
              {error && <Text className="text-red-500">{error.message}</Text>}
            </View>
          )}
        />

        {/* Price */}
        <Controller
          control={control}
          name="price"
          rules={{
            required: "Price is required",
            min: { value: 1, message: "Price must be positive" },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View>
              <TextInput
                placeholder="Price"
                keyboardType="numeric"
                value={value ? value.toString() : ""}
                onChangeText={(text) => onChange(text ? Number(text) : 0)}
                className="border p-3 mb-4"
              />
              {error && <Text className="text-red-500">{error.message}</Text>}
            </View>
          )}
        />

        {/* Submit Button */}
        <View className="mt-4">
          <Button title="Save" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
