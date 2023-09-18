import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CTAButtonBig } from "../src/Components/CTAButton/CTAButtonBig";
import { useState } from "react";
import { HeaderContainer } from "../src/Components/HeaderContainer/HeaderContainer";
import { ref, set, getDatabase, get } from "firebase/database";
import { Navbar } from "../src/Components/Navbar/Navbar";

const SubscriptionScreen = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [subscription, setSubscription] = useState("");
  getData();

  // const addData = () => {
  //   const db = ref(getDatabase());
  //   set(ref(db, "users/" + user.uid), {
  //     subscription: subscription,
  //   });
  // };

  function addData() {
    const db = getDatabase();
    set(ref(db, "users/" + user.uid), {
      subscription: subscription,
    });
    console.log("data added" + subscription);
  }

  function getData() {
    const db = getDatabase();
    const userData = ref(db, "users/" + user.uid);
    get(userData)
      .then((snapshot) => {
        if (snapshot.exists()) {
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

  return (
    <SafeAreaView>
      <HeaderContainer title="Prenumationer" />
      <Text>Welcome {user.email} </Text>
      <TextInput
        placeholder="Prenumeration"
        onChangeText={(text) => setSubscription(text)}
      />
      <CTAButtonBig title="Lägg till test" onPress={addData} />
      <CTAButtonBig
        title="Lägg till prenumation"
        onPress={() => navigation.navigate("AddSubscription")}
      />

      <CTAButtonBig title="Logga ut" onPress={signOut} />
    </SafeAreaView>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({});
