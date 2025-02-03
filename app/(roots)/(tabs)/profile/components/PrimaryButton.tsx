import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";

interface PrimaryButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function PrimaryButton({ title, onPress }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-blue-600 py-3 px-6 rounded-lg items-center"
    >
      <Text className="text-white text-lg font-semibold">{title}</Text>
    </TouchableOpacity>
  );
}
