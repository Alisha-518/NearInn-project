// Components: UserProfile, UserBusinesses, AddBusinessButton
//app\(roots)\(tabs)\profile\index.tsx

import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-4">User Profile</Text>

      {/* Profile Info Section */}
      <View className="mb-6">
        <Text className="text-lg font-bold">Profile Info</Text>
        <Button
          title="Edit Profile"
          onPress={() => router.push("/profile/edit")}
        />
      </View>

      {/* Business Section */}
      <View>
        <Text className="text-lg font-bold mb-2">Businesses</Text>
        {/* Example list of businesses */}
        <Button
          title="Business 1"
          onPress={() => router.push("/profile/business/1")}
        />
        <Button
          title="Business 2"
          onPress={() => router.push("/profile/business/2")}
        />
        <Button
          title="Add New Business"
          onPress={() => router.push("/profile/business/form")}
        />
      </View>
    </View>
  );
}
