import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { CTAButtonBig } from "../src/Components/CTAButton/CTAButtonBig";

const LandingScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: "1",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar style="dark" />
      <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 48 }}>
        tracky.
      </Text>
      <Text style={{ fontFamily: "Inter_400Regular", fontSize: 16 }}>
        Lorem ipsum dolor sit amet consectetur. Donec augue elit praesent
        faucibus quisque malesuada vitae pellentesque aliquam.
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
