import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { CTAButtonBig } from "../src/Components/CTAButton/CTAButtonBig";
import { Image } from "expo-image";

const LandingScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 44,
        paddingHorizontal: 12,
        backgroundColor: "white",
      }}
    >
      <StatusBar style="dark" />
      <View style={{ height: "40%", backgroundColor: "grey", width: "100%" }}>
        <Image
          source={require("../assets/landing.png")}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
        />
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingBottom: 10,
        }}
      >
        <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 48 }}>
          tracky.
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            textAlign: "center",
            lineHeight: 22,
            marginHorizontal: "6%",
          }}
        >
          Lorem ipsum dolor sit amet consectetur. Donec augue elit praesent
          faucibus quisque malesuada vitae pellentesque aliquam.
        </Text>
      </View>

      <View style={{ gap: 16 }}>
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
    </SafeAreaView>
  );
};

export default LandingScreen;
