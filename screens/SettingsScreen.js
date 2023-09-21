import { StyleSheet, Text, View, Image, SafeAreaView, Button } from "react-native";
import { Card } from "../src/Components/Card/Card";
import { Navbar } from "../src/Components/Navbar/Navbar";
import React from "react";


const SettingsScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Text>Inställningar</Text>
        <Card variant="settings" title="Om oss" icon="terms"/>
        <Card variant="settings" title="Villkor" icon="terms" color="orange"/>
        <Card variant="settings" title="Hjäp" icon="help"/>
        
        <Card variant="basic" title="Example" icon="default" iconColor="blue" color="gray"/>
        <Card variant="default" title="Test" color="red" icon="netflix" info="455kr/mån"/>
        <Card variant="basic" title="Basic" info="Basic"/>
        <Card variant="basic" title="Lägg till egen" icon="plus"/> 
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
    height: window.innerHeight,
    backgroundColor: "white",
  },

  illustration: {
    width: 200,
    height: 200,
    backgroundColor: "gray",
  }

});
