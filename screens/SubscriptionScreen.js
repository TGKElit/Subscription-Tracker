import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CTAButtonBig } from "../src/Components/CTAButton/CTAButtonBig";
import { useState } from "react";
import { HeaderContainer } from "../src/Components/HeaderContainer/HeaderContainer";
import { ref, set, getDatabase, get } from "firebase/database";
import { Navbar } from "../src/Components/Navbar/Navbar";
import { useFocusEffect } from "@react-navigation/native";

const SubscriptionScreen = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [subscriptions, setSubscriptions] = useState([]);
  let totalCost = 0;

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  function getData() {
    const db = getDatabase();
    const userData = ref(db, "users/" + user.uid);
    get(userData)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setSubscriptions(snapshot.val());
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

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

  Object.keys(subscriptions).map((key) => {
    totalCost += parseInt(subscriptions[key].price);
  });

  return (
    <SafeAreaView>
      <HeaderContainer title="Prenumationer" />
      <Text>Welcome {user.email} </Text>
      <Text>Total Cost: {totalCost}</Text>

      <CTAButtonBig
        title="Lägg till prenumation"
        onPress={() => navigation.navigate("AddSubscription")}
      />
      <CTAButtonBig title="Logga ut" onPress={signOut} />
      {Object.keys(subscriptions).map((key) => (
        <View key={key}>
          <Text>Name: {subscriptions[key].name}</Text>
          <Text>Billing Period: {subscriptions[key].billingPeriod}</Text>
          <Text>Description: {subscriptions[key].description}</Text>
          <Text>Price: {subscriptions[key].price}</Text>
          <Text>Start Date: {subscriptions[key].startDate}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({});
