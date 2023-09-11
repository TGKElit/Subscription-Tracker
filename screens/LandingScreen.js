import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const LandingScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <StatusBar style="dark" />

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
    </SafeAreaView>
  );
};

export default LandingScreen;
