//app\(roots)\(tabs)\profile\components\BusinessForm.tsx (collects data)
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import ModalSelector from "react-native-modal-selector";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToStorage } from "../../../../../lib/appwrite"; // ✅ Import function to upload image
import { validateForm } from "./formValidation"; // ✅ Import validation function

type BusinessFormProps = {
  onSubmit: (data: BusinessFormValues) => void;
  defaultValues?: BusinessFormValues;
};

export type BusinessFormValues = {
  name: string;
  type: string;
  description: string;
  address: string;
  price?: number;
  area?: number;
  bedrooms?: number;
  rating?: number;
  facilities: string;
  image: string;
  geolocation: string;
  agent: string;
  bathrooms?: number;
};

// 📌 Drop-down values for Type & Facilities
const propertyTypes = [
  { key: "House", label: "House" },
  { key: "Townhouse", label: "Townhouse" },
  { key: "Condo", label: "Condo" },
  { key: "Duplex", label: "Duplex" },
  { key: "Studio", label: "Studio" },
  { key: "Villa", label: "Villa" },
  { key: "Appartment", label: "Apartment" },
  { key: "Other", label: "Other" },
];

const facilitiesOptions = [
  { key: "Laundry", label: "Laundry" },
  { key: "Parking", label: "Parking" },
  { key: "Gym", label: "Gym" },
  { key: "Wifi", label: "Wifi" },
  { key: "Pet-friendly", label: "Pet-friendly" },
];

export default function BusinessForm({
  onSubmit,
  defaultValues,
}: BusinessFormProps) {
  const { control, handleSubmit, setValue } = useForm<BusinessFormValues>({
    defaultValues,
  });
  const [localImageUri, setLocalImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // 📌 Pick an Image from Device
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log("Picked Image URI:", uri);
      setLocalImageUri(uri); // Show image preview before upload
    }
  };

  // 📌 Upload Image to Appwrite Storage
  const handleImageUpload = async (): Promise<string | null> => {
    if (!localImageUri) return null; // If no image selected, skip upload
    setUploading(true);

    const uploadedImageUrl = await uploadImageToStorage(localImageUri);
    setUploading(false);

    return uploadedImageUrl;
  };

  // 📌 Handle Form Submission
  const handleFormSubmit = async (data: BusinessFormValues) => {
    if (!(await validateForm(data))) {
      return; // ❌ Prevent form submission if validation fails
    }

    console.log("📌 Submitting Form Data...", data);

    // ✅ Only upload image if a new one is selected
    let uploadedImageUrl: string = data.image; // Default to existing image

    if (localImageUri) {
      uploadedImageUrl = (await handleImageUpload()) || ""; // ✅ Convert `null` to an empty string
    }

    const finalData = {
      ...data,
      image: uploadedImageUrl, // ✅ Now always a string
    };

    console.log("✅ Final Data Sent to Database:", finalData);
    onSubmit(finalData);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView className="p-6 bg-white">
        {/* Business Name */}
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Business Name"
              value={value}
              onChangeText={onChange}
              className="border p-3 mb-4"
            />
          )}
        />

        {/* Improved Drop-down for Property Type */}
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <ModalSelector
              data={propertyTypes}
              initValue="Select Property Type"
              onChange={(option) => onChange(option.key)}
              style={{
                marginBottom: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                backgroundColor: "#f9f9f9",
              }}
              selectStyle={{ borderWidth: 0 }}
            >
              <Text style={{ padding: 10, color: value ? "#000" : "#888" }}>
                {value
                  ? propertyTypes.find((t) => t.key === value)?.label
                  : "Select Property Type"}
              </Text>
            </ModalSelector>
          )}
        />

        {/* Improved Drop-down for Facilities */}
        <Controller
          control={control}
          name="facilities"
          render={({ field: { onChange, value } }) => (
            <ModalSelector
              data={facilitiesOptions}
              initValue="Select Facility"
              onChange={(option) => onChange(option.key)}
              style={{
                marginBottom: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                backgroundColor: "#f9f9f9",
              }}
              selectStyle={{ borderWidth: 0 }}
            >
              <Text style={{ padding: 10, color: value ? "#000" : "#888" }}>
                {value
                  ? facilitiesOptions.find((f) => f.key === value)?.label
                  : "Select Facility"}
              </Text>
            </ModalSelector>
          )}
        />

        {/* Upload Image Button */}
        <TouchableOpacity
          onPress={pickImage}
          className="border p-3 mb-4 bg-gray-200 rounded"
        >
          <Text className="text-center">
            {uploading ? "Uploading Image..." : "Pick an Image"}
          </Text>
        </TouchableOpacity>

        {/* Display Selected Image Preview */}
        {localImageUri && (
          <Image
            source={{ uri: localImageUri }}
            style={{ width: 200, height: 200, marginBottom: 10 }}
          />
        )}

        {/* Save Button */}
        <View className="mt-4">
          <Button title="Save" onPress={handleSubmit(handleFormSubmit)} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
