declare module "react-native-multi-selectbox" {
    import React from "react";
    import { ViewStyle, TextStyle } from "react-native";
  
    export type MultiSelectProps = {
      options: { id: string; item: string }[];
      selectedValues: { id: string; item: string }[];
      onMultiSelect: (item: { id: string; item: string }) => void;
      onRemove: (item: { id: string; item: string }) => void;
      labelField?: string;
      valueField?: string;
      search?: boolean;
      style?: ViewStyle;
    };
  
    export const MultiSelect: React.FC<MultiSelectProps>;
  }
  