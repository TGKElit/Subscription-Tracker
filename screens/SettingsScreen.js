import { StyleSheet, Text, View, Image, SafeAreaView, Pressable } from "react-native";
import { Card } from "../src/Components/Card/Card";
import { Navbar } from "../src/Components/Navbar/Navbar";
import { HeaderContainer } from "../src/Components/HeaderContainer/HeaderContainer";
import { getAuth } from "firebase/auth";
import React from "react";


const SettingsScreen = ({navigation}) => {
  const auth = getAuth();

  const signOut = () => {
    auth.signOut()
      .then(navigation.navigate("Landing"));
  };

  return (
    <SafeAreaView style={styles.body}>
      <HeaderContainer title="Inställningar" />
      <View id="test" style={styles.menu}>
        <Card variant="settings" title="Om oss" icon="terms"/>
        <Card variant="settings" title="Villkor" icon="terms" color="orange"/>
        <Card variant="settings" title="Hjäp" icon="help"/>
        
        {/*<Card variant="basic" title="Example" icon="default" iconColor="blue" color="gray"/>
        <Card variant="default" title="Test" color="red" icon="netflix" info="455kr/mån"/>
        <Card variant="basic" title="Basic" info="Basic"/>
        <Card variant="basic" title="Lägg till egen" icon="plus"/> */}
        <Image style={styles.illustration}/>
        <Pressable onPress={signOut}>
          <Text style={styles.logout}>Logga ut</Text>
        </Pressable>
      </View>
      <Navbar navigation={navigation} screen="settings"/>
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
    color:"#E60000",
    
    margin: 12,
    marginLeft: 24,
  },

});
