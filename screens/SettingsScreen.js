import { StyleSheet, Text, View, Image, SafeAreaView, Button } from "react-native";
import { Card } from "../src/Components/Card/Card";
import { Navbar } from "../src/Components/Navbar/Navbar";
import React from "react";


const SettingsScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Inställningar</Text>
        <Card variant="settings" title="Om oss" icon={require('/assets/icons/icon=terms.svg')}></Card>
        <Card variant="settings" title="Villkor" icon={require('/assets/icons/icon=terms.svg')}></Card>
        <Card variant="settings" title="Hjäp" icon={require('/assets/icons/icon=help.svg')}></Card>
        <Image style={styles.illustration}/>
        <Button
          title="Logga ut"
          onPress={() => navigation.navigate("Landing")}
        />
        <Navbar navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  illustration: {
    width: 200,
    height: 200,
    backgroundColor: "gray",
  }

});
