//lib\appwriteDatabase.ts

import { ID } from "react-native-appwrite";
import { databases, config } from "./appwrite";
import { getCurrentUser } from "./appwrite"; // ✅ Still needed for authentication
import { Query } from "react-native-appwrite";

// ✅ Create Property with Image Upload Support
export async function createProperty(data: {
  name: string;
  address: string;
  type: string;
  price: number;
  area: number;
  bedrooms: number;
  rating: number;
  facilities: string;
  image?: string; // ✅ Marked as optional
  geolocation: string;
  bathrooms: number;
  authId : string;
}) {
  try {
    console.log("🔹 Step 1: Starting property creation...");

    const user = await getCurrentUser();
    console.log("✅ Step 2: Retrieved User:", user);

    if (!user) throw new Error("User not authenticated");

    // ✅ Validate and fix the image field safely
    const validatedData = {
      ...data,
      image: data.image && typeof data.image === "string" && data.image.trim() !== "" ? data.image : "https://example.com/default-image.jpg", // ✅ don't want to use null, this is just a default image that I'll change later
      agent: user.$id, // ✅ Store the user ID as the agent
      authId : user.$id,
    };

    console.log("🟢 Data being sent to Appwrite:", validatedData);

    // ✅ Create the property
    const result = await databases.createDocument(
      config.databaseId!,
      config.propertiesCollectionId!,
      ID.unique(),
      validatedData
    );

    console.log("✅ Step 3: Property Created Successfully:", result);
    return result;
  } catch (error: any) {
    console.error("❌ Error creating property:", error.message || error);
    return null;
  }
}

// ✅ Fetch businesses for a specific user
export async function getUserBusinesses(userId: string) {
  try {
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.equal("authId", userId)] // ✅ Fetch businesses where `agent` is the logged-in user
    );

    return result.documents;
  } catch (error) {
    console.error("❌ Error fetching businesses:", error);
    return [];
  }
}

// ✅ Create Product with Business Relationship
export async function createProduct(data: {
  name: string;
  type: string;
  price: number;
  properties: string; // Business ID (relationship)
}) {
  try {
    const result = await databases.createDocument(
      config.databaseId!,
      config.productsCollectionId!,
      ID.unique(),
      {
        ...data,
        properties: data.properties, // ✅ Store as a single string (business ID)
      }
    );
    return result;
  } catch (error) {
    console.error("❌ Error creating product:", error);
    return null;
  }
}

// ✅ Update Product with Business Relationship
export async function updateProduct(
  id: string,
  data: Partial<{ name: string; type: string; price: number; properties: string }>
) {
  try {
    const result = await databases.updateDocument(
      config.databaseId!,
      config.productsCollectionId!,
      id,
      {
        ...data,
        properties: data.properties || undefined, // ✅ Store as string (business ID)
      }
    );
    return result;
  } catch (error) {
    console.error("❌ Error updating product:", error);
    return null;
  }
}

// ✅ Fetch Business Details by ID
export async function getBusinessById(id: string) {
  try {
    const result = await databases.getDocument(config.databaseId!, config.propertiesCollectionId!, id);
    return result;
  } catch (error) {
    console.error("❌ Error fetching business:", error);
    return null;
  }
}

// ✅ Fetch Products Linked to Business (where `properties` = businessId)
export async function getProductsByBusinessId(businessId: string) {
  try {
    const result = await databases.listDocuments(
      config.databaseId!,
      config.productsCollectionId!,
      [Query.equal("properties", businessId)] // ✅ Query products by business relationship
    );

    return result.documents;
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
}
