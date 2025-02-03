import { View, TextInput, Button } from "react-native";

type ProductFormProps = {
  onSubmit: () => void;
  defaultValues?: {
    name?: string;
    price?: string;
  };
};

export default function ProductForm({
  onSubmit,
  defaultValues,
}: ProductFormProps) {
  return (
    <View className="p-6 bg-white">
      <TextInput
        placeholder="Product Name"
        defaultValue={defaultValues?.name}
        className="border p-3 mb-4"
      />
      <TextInput
        placeholder="Price"
        defaultValue={defaultValues?.price}
        className="border p-3 mb-4"
        keyboardType="numeric"
      />
      <Button title="Save" onPress={onSubmit} />
    </View>
  );
}
