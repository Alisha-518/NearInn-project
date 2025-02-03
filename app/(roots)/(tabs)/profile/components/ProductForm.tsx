import { useState } from "react";
import { View, TextInput, Button } from "react-native";

type ProductFormProps = {
  onSubmit: (data: { name: string; price: string }) => void;
  defaultValues?: {
    name?: string;
    price?: string;
  };
};

export default function ProductForm({
  onSubmit,
  defaultValues,
}: ProductFormProps) {
  const [name, setName] = useState(defaultValues?.name || "");
  const [price, setPrice] = useState(defaultValues?.price || "");

  const handleSubmit = () => {
    onSubmit({ name, price });
  };

  return (
    <View className="p-6 bg-white">
      <TextInput
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
        className="border p-3 mb-4"
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        className="border p-3 mb-4"
        keyboardType="numeric"
      />
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
}
