import { Alert } from "react-native";
import { BusinessFormValues } from "./BusinessForm"; // Import the form type

// 📌 Function to Validate Required Fields
export const validateForm = (data: BusinessFormValues): boolean => {
  const requiredFields: (keyof BusinessFormValues)[] = ["name", "type"];

  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === "string" && data[field].trim() === "")) {
      Alert.alert("Validation Error", `Please fill out the ${field} field.`);
      return false;
    }
  }

  return true;
};
