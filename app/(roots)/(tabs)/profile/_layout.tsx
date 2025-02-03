//app\(roots)\(tabs)\profile\_layout.tsx
import { Stack } from "expo-router";

export default function ProfileStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Profile" }} />
      <Stack.Screen name="edit" options={{ title: "Edit Profile" }} />
      <Stack.Screen
        name="business/[id]"
        options={{ title: "Business Details", headerShown: false }}
      />
      <Stack.Screen
        name="business/form"
        options={{ title: "Add/Edit Business", headerShown: false }}
      />
      <Stack.Screen
        name="product/[id]"
        options={{ title: "Product Details", headerShown: false }}
      />
      <Stack.Screen
        name="product/form"
        options={{ title: "Add/Edit Product", headerShown: false }}
      />
    </Stack>
  );
}
