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
        gap: "44px",
        marginHorizontal: "12px",
      }}
    >
      <View
        style={{ height: "342px", backgroundColor: "grey", width: "100%" }}
      ></View>
      <StatusBar style="dark" />
      <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 48 }}>
        tracky.
      </Text>
      <Text
        style={{
          fontFamily: "Inter_400Regular",
          fontSize: 16,
        }}
      >
        Lorem ipsum dolor sit amet consectetur. Donec augue elit praesent
        faucibus quisque malesuada vitae pellentesque aliquam.
      </Text>

      <View>
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
      </View>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </SafeAreaView>
  );
};

export default LandingScreen;
