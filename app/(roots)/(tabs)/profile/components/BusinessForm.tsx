import { View, TextInput, Button } from "react-native";

type BusinessFormProps = {
  onSubmit: () => void; // Function type for submission
  defaultValues?: {
    // Optional default values
    name?: string;
    category?: string;
  };
};

export default function BusinessForm({
  onSubmit,
  defaultValues,
}: BusinessFormProps) {
  return (
    <View className="p-6 bg-white">
      <TextInput
        placeholder="Business Name"
        defaultValue={defaultValues?.name}
        className="border p-3 mb-4"
      />
      <TextInput
        placeholder="Category"
        defaultValue={defaultValues?.category}
        className="border p-3 mb-4"
      />
      <Button title="Save" onPress={onSubmit} />
    </View>
  );
}
