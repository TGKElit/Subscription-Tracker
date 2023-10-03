import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { CTAButtonBig } from "../src/Components/CTAButton/CTAButtonBig";
import { Image } from "expo-image";

const LandingScreen = ({ navigation }) => {
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 12,
      backgroundColor: "#FFFFFF",
      height: "100%",
      width: "100%",
    },
    imageContainer: {
      height: 250,
      width: 250,
    },
    image: {
      width: "100%",
      height: "100%",
      contentFit: "fill",
    },
    textContainer: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    title: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 48,
      marginBottom: 10,
    },
    descriptionText: {
      fontFamily: "Inter_400Regular",
      fontSize: 16,
      textAlign: "center",
      lineHeight: 22,
      marginHorizontal: 10,
      marginBottom: 32,
    },
    buttonContainer: {
      gap: 16,
      width: "100%",
      marginBottom: 48,
    },
  });
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/landing.png")}
          style={styles.image}
          contentFit="cover"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>tracky.</Text>
        <Text style={styles.descriptionText}>
          Upptäck vår prenumerationsspårningsapp – din nyckel till ekonomisk
          kontroll! Missa aldrig en betalning igen med våra tidiga påminnelser
          och spåra dina utgifter utan ansträngning.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
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
