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

  let totalCost = 0;

  Object.keys(subscriptions).map((key) => {
    let monthlyCost = 0;
    if (subscriptions[key].billingPeriod === "år") {
      monthlyCost = subscriptions[key].price / 12;
      monthlyCost = parseFloat(monthlyCost);
    } else if (subscriptions[key].billingPeriod === "kvartal") {
      monthlyCost = subscriptions[key].price / 4;
      monthlyCost = parseFloat(monthlyCost);
    } else if (subscriptions[key].billingPeriod === "månad") {
      monthlyCost = subscriptions[key].price;
      monthlyCost = parseFloat(monthlyCost);
    }

    totalCost += monthlyCost;
  });

  return (
    <SafeAreaView>
      <HeaderContainer title="Prenumationer" />
      <View style={{ paddingHorizontal: 12 }}>
        <View
          style={{
            height: 134,
            width: "100%",
            borderRadius: 12,
            borderWidth: 2,
            paddingTop: 24,
            paddingHorizontal: 12,
            paddingBottom: 12,
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          <Text style={{ fontSize: 12, fontFamily: "Inter_400Regular" }}>
            Denna månaden kommer du att betala:
          </Text>
          <Text style={{ fontSize: 36, fontFamily: "Inter_700Bold" }}>
            {totalCost} kr
          </Text>
        </View>

        <View>
          <Text style={{ fontSize: 24, fontFamily: "Inter_600SemiBold" }}>
            Prenumationer
          </Text>
          {Object.keys(subscriptions).map((key) => (
            <View
              key={key}
              style={{ width: "100%", height: 64, flexDirection: "row" }}
            >
              <Text>Name: {subscriptions[key].name}</Text>
              <Text>
                {subscriptions[key].price}kr /{" "}
                {subscriptions[key].billingPeriod}
              </Text>
            </View>
          ))}
        </View>
        <CTAButtonBig
          title="Lägg till prenumation"
          onPress={() => navigation.navigate("AddSubscription")}
        />
        <CTAButtonBig title="Logga ut" onPress={signOut} />
        {/* {Object.keys(subscriptions).map((key) => (
          <View key={key}>
            <Text>Name: {subscriptions[key].name}</Text>
            <Text>Billing Period: {subscriptions[key].billingPeriod}</Text>
            <Text>Description: {subscriptions[key].description}</Text>
            <Text>Price: {subscriptions[key].price}</Text>
            <Text>Start Date: {subscriptions[key].startDate}</Text>
          </View>
        ))} */}
      </View>
    </SafeAreaView>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({});
