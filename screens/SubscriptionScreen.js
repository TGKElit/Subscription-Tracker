import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CTAButtonBig } from "../src/Components/CTAButton/CTAButtonBig";
import { useState } from "react";
import { HeaderContainer } from "../src/Components/HeaderContainer/HeaderContainer";

const SubscriptionScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const signOut = () => {
    auth.signOut();
    navigation.navigate("Landing");
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      const email = user.email;
      console.log(uid);
      console.log(email);
      // ...
    } else {
      console.log("no user");
      // User is signed out
      // ...
    }
  });

  return (
    <SafeAreaView>
      <HeaderContainer title="Prenumationer" />
      <Text>Welcome {user.email} </Text>
      <CTAButtonBig title="Logga ut" onPress={signOut} />
    </SafeAreaView>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({});
