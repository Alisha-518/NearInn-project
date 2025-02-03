import { View, Text, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

interface ImageUploaderProps {
  onImageSelected: (uri: string) => void;
}

export default function ImageUploader({ onImageSelected }: ImageUploaderProps) {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access gallery is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImageUri(selectedImageUri);
      onImageSelected(selectedImageUri);
    }
  };

  return (
    <View className="mb-4 items-center">
      <Text className="text-lg font-semibold mb-2">Profile Picture</Text>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          className="w-24 h-24 rounded-full mb-2"
        />
      )}
      <TouchableOpacity
        onPress={pickImage}
        className="bg-blue-500 py-2 px-4 rounded-lg"
      >
        <Text className="text-white">Upload Image</Text>
      </TouchableOpacity>
    </View>
  );
}
