// Components: FormField, ImageUploader, PrimaryButton

//app\(roots)\(tabs)\profile\edit.tsx

import { useState } from "react";
import { View, Text } from "react-native";
import FormField from "././components/FormField";
import ImageUploader from "././components/ImageUploader";
import PrimaryButton from "././components/PrimaryButton";
import { useRouter } from "expo-router";

export default function EditProfile() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string | null>(null); // Fix: Accept string or null

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-4">Edit Profile</Text>

      <ImageUploader onImageSelected={setImage} />
      <FormField
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      <FormField
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />

      <PrimaryButton title="Save Changes" onPress={() => router.back()} />
    </View>
  );
}
