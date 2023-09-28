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
        paddingHorizontal: 12,
        backgroundColor: "white",
        height: "100%",
        width: "100%",
      }}
    >
      <StatusBar style="dark" />
      <View
        style={{
          height: 250,
          backgroundColor: "grey",
          width: 250,
        }}
      >
        <Image
          source={require("../assets/landing.png")}
          style={{ width: "100%", height: "100%", contentFit: "fill" }}
          contentFit="cover"
        />
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 48,
            marginBottom: 10,
          }}
        >
          tracky.
        </Text>
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 16,
            textAlign: "center",
            lineHeight: 22,
            marginHorizontal: 10,
            marginBottom: 32,
          }}
        >
          Upptäck vår prenumerationsspårningsapp – din nyckel till ekonomisk
          kontroll! Missa aldrig en betalning igen med våra tidiga påminnelser
          och spåra dina utgifter utan ansträngning.
        </Text>
      </View>

      <View style={{ gap: 16, width: "100%", marginBottom: 48 }}>
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
