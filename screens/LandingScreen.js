import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { CTAButtonBig } from "../src/Components/CTAButton/CTAButtonBig";

const LandingScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <StatusBar style="dark" />
      <Text style={{ fontSize: 40 }}>Original</Text>
      <Text style={{ fontFamily: "Inter_400Regular", fontSize: 40 }}>
        Not Original
      </Text>
      <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 40 }}>
        Landing Screen
      </Text>
      <CTAButtonBig
        title="Logga in"
        onPress={() => navigation.navigate("Login")}
        variant="primary"
      />

      <CTAButtonBig
        title="Registrera"
        onPress={() => navigation.navigate("Register")}
        variant="secondary"
      />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </SafeAreaView>
  );
};

export default LandingScreen;
