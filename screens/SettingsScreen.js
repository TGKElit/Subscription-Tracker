import { StyleSheet, Text, View, Image, SafeAreaView, Button } from "react-native";
import { Card } from "../src/Components/Card/Card";
import { Navbar } from "../src/Components/Navbar/Navbar";
import React from "react";


const SettingsScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Text>Inställningar</Text>
        <Card variant="settings" title="Om oss" icon="disney"></Card>
        <Card variant="settings" title="Villkor" icon="terms" color="orange"></Card>
        <Card variant="settings" title="Hjäp" icon="help"></Card>
        <Image style={styles.illustration}/>
        <Button
          title="Logga ut"
          onPress={() => navigation.navigate("Landing")}
        />
      </View>
      <Navbar navigation={navigation} screen="settings"/>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  body: {
    height: window.innerHeight
  },

  illustration: {
    width: 200,
    height: 200,
    backgroundColor: "gray",
  }

});
