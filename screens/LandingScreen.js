import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const LandingScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Landing Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
};

export default LandingScreen;
