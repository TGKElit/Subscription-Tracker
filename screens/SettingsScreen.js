import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
import { Card } from "../src/Components/Card/Card";
import { Navbar } from "../src/Components/Navbar/Navbar";
import { HeaderContainer } from "../src/Components/HeaderContainer/HeaderContainer";
import { getAuth } from "firebase/auth";
import React from "react";

const SettingsScreen = ({ navigation }) => {
  const auth = getAuth();

  const signOut = () => {
    auth.signOut().then(navigation.navigate("Landing"));
  };

  return (
    <SafeAreaView style={styles.body}>
      <HeaderContainer title="Inställningar" />
      <View style={styles.menu}>
        <Card variant="settings" title="Om oss" icon="terms" />
        <Card variant="settings" title="Villkor" icon="terms" color="orange" />
        <Card variant="settings" title="Hjälp" icon="help" />
      </View>
      <Pressable onPress={signOut} style={{ position: "absolute", bottom: 0 }}>
        <Text style={styles.logout}>Logga ut</Text>
      </Pressable>
      <Navbar navigation={navigation} screen="settings" />
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  body: {
    height: "100%",
    backgroundColor: "white",
  },

  menu: {
    display: "flex",
    gap: 12,
    padding: 12,
    paddingTop: 24,
  },
  illustration: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: "gray",
  },

  logout: {
    color: "#E60000",
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    margin: 12,
    marginLeft: 24,
    marginBottom: 93,
  },
});
