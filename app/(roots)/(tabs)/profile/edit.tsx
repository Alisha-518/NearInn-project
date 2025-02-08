// Components: FormField, ImageUploader, PrimaryButton
//app\(roots)\(tabs)\profile\edit.tsx

import { useState } from "react";
import { View, Text } from "react-native";
import FormField from "./components/FormField";
import ImageUploader from "./components/ImageUploader";
import PrimaryButton from "./components/PrimaryButton";
import { useRouter } from "expo-router";

export default function EditProfile() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [dob, setDob] = useState<string>(""); // Store as string in ISO format (YYYY-MM-DD)
  const [address, setAddress] = useState<string>("");
  const [image, setImage] = useState<string | null>(null); // Fix: Accept string or null
  const [phone, setPhone] = useState<string>(""); // Store as string to handle phone validation

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
        label="Date of Birth"
        value={dob}
        onChangeText={setDob}
        placeholder="YYYY-MM-DD"
        keyboardType="numeric"
      />

      <FormField
        label="Address"
        value={address}
        onChangeText={setAddress}
        placeholder="Enter your address"
      />

      <FormField
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />

      <PrimaryButton title="Save Changes" onPress={() => router.back()} />
    </View>
  );
}
