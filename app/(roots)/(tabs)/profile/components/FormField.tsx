//app\(roots)\(tabs)\profile\components\FormField.tsx
import { View, Text, TextInput, TextInputProps } from "react-native";

interface FormFieldProps extends TextInputProps {
  label: string;
}

export default function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  ...props
}: FormFieldProps) {
  return (
    <View className="mb-4">
      <Text className="text-lg font-semibold mb-2">{label}</Text>
      <TextInput
        className="border p-2 rounded-lg"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        {...props}
      />
    </View>
  );
}
