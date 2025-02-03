//app\(roots)\(tabs)\_layout.tsx

import { Tabs } from "expo-router";
// Importing the `Tabs` component from `expo-router` to create a tab-based navigation.

import { Image, ImageSourcePropType, Text, View } from "react-native";
// Importing components from `react-native` for UI.

import icons from "@/constants/icons";
// Importing custom icons from a constants file for the tab icons.

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}) => (
  <View style={{ alignItems: "center", marginTop: 12 }}>
    <Image
      source={icon}
      tintColor={focused ? "#0061FF" : "#666876"}
      resizeMode="contain"
      style={{ width: 24, height: 24 }}
    />
    <Text
      style={{
        color: focused ? "#0061FF" : "#666876",
        fontSize: 12,
        textAlign: "center",
        marginTop: 4,
        fontFamily: focused ? "Rubik-Medium" : "Rubik-Regular",
      }}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        // Hides the default tab bar labels.
        tabBarStyle: {
          backgroundColor: "white",
          // Sets the tab bar's background color to white.
          position: "absolute",
          // Positions the tab bar absolutely at the bottom.
          borderTopColor: "#0061FF1A",
          // Sets a light blue border color at the top of the tab bar.
          borderTopWidth: 1,
          // Defines the width of the top border.
          minHeight: 70,
          // Ensures the tab bar has a minimum height for usability.
        },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          // Title for the Home screen.
          headerShown: false,
          // Hides the header for the screen.
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
            // Customizes the tab icon and label for Home.
          ),
        }}
      />

      {/* Explore Tab */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          // Title for the Explore screen.
          headerShown: false,
          // Hides the header for the screen.
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Explore" />
            // Customizes the tab icon and label for Explore.
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          // Title for the Profile screen.
          headerShown: false,
          // Hides the header for the screen.
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
            // Customizes the tab icon and label for Profile.
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
// Exports the TabsLayout component to be used in the app.
