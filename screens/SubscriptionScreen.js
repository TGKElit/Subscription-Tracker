import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
import Svg, { Path } from "react-native-svg";
import { Card } from "../src/Components/Card/Card";

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
      {/* custom header */}
      <View
        style={{
          width: "100%",
          height: 104,
          flexDirection: "row",
          justifyContent: "center",
          borderBottomEndRadius: 8,
          borderWidth: 2,
          alignItems: "center",
        }}
      >
        <Text style={styles.textStyle}>Prenumationer</Text>
        <Pressable onPress={() => navigation.navigate("AddSubscription")}>
          <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <Path
              id="Subtract"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM8.1 4.95C8.1 4.45294 8.50294 4.05 9 4.05C9.49706 4.05 9.9 4.45294 9.9 4.95V8.1H13.05C13.5471 8.1 13.95 8.50294 13.95 9C13.95 9.49706 13.5471 9.9 13.05 9.9H9.9V13.05C9.9 13.5471 9.49706 13.95 9 13.95C8.50294 13.95 8.1 13.5471 8.1 13.05V9.9H4.95C4.45294 9.9 4.05 9.49706 4.05 9C4.05 8.50294 4.45294 8.1 4.95 8.1H8.1V4.95Z"
              fill="#EA0059"
            ></Path>
          </Svg>
        </Pressable>
      </View>

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

        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 24, fontFamily: "Inter_600SemiBold" }}>
            Prenumationer
          </Text>

          {Object.keys(subscriptions).map((key) => (
            <Pressable
              onPress={() =>
                navigation.navigate("SubscriptionInfo", {
                  name: subscriptions[key].name,
                  price: subscriptions[key].price,
                  billingPeriod: subscriptions[key].billingPeriod,
                  description: subscriptions[key].description,
                  startDate: subscriptions[key].startDate,
                })
              }
            >
              {subscriptions[key].name === "Netflix" && (
                <Card
                  onPress={() =>
                    navigation.navigate("SubscriptionInfo", {
                      name: subscriptions[key].name,
                      price: subscriptions[key].price,
                      billingPeriod: subscriptions[key].billingPeriod,
                      description: subscriptions[key].description,
                      startDate: subscriptions[key].startDate,
                    })
                  }
                  variant="default"
                  title={subscriptions[key].name}
                  color="#E60000"
                  icon="netflix"
                  info={`${subscriptions[key].price}kr / ${subscriptions[key].billingPeriod}`}
                />
              )}

              {subscriptions[key].name === "HBO Max" && (
                <Card
                  onPress={() =>
                    navigation.navigate("SubscriptionInfo", {
                      name: subscriptions[key].name,
                      price: subscriptions[key].price,
                      billingPeriod: subscriptions[key].billingPeriod,
                      description: subscriptions[key].description,
                      startDate: subscriptions[key].startDate,
                    })
                  }
                  variant="default"
                  title={subscriptions[key].name}
                  color="#9C00AF"
                  icon="hbo"
                  info={`${subscriptions[key].price}kr / ${subscriptions[key].billingPeriod}`}
                />
              )}

              {subscriptions[key].name === "Amazon Prime" && (
                <Card
                  onPress={() =>
                    navigation.navigate("SubscriptionInfo", {
                      name: subscriptions[key].name,
                      price: subscriptions[key].price,
                      billingPeriod: subscriptions[key].billingPeriod,
                      description: subscriptions[key].description,
                      startDate: subscriptions[key].startDate,
                    })
                  }
                  variant="default"
                  title={subscriptions[key].name}
                  color="#0097EC"
                  icon="prime"
                  info={`${subscriptions[key].price}kr / ${subscriptions[key].billingPeriod}`}
                />
              )}
              {subscriptions[key].name === "Spotify" && (
                <Card
                  onPress={() =>
                    navigation.navigate("SubscriptionInfo", {
                      name: subscriptions[key].name,
                      price: subscriptions[key].price,
                      billingPeriod: subscriptions[key].billingPeriod,
                      description: subscriptions[key].description,
                      startDate: subscriptions[key].startDate,
                    })
                  }
                  variant="default"
                  title={subscriptions[key].name}
                  color="#00863F"
                  icon="spotify"
                  info={`${subscriptions[key].price}kr / ${subscriptions[key].billingPeriod}`}
                />
              )}
              {subscriptions[key].name === "Storytel" && (
                <Card
                  onPress={() =>
                    navigation.navigate("SubscriptionInfo", {
                      name: subscriptions[key].name,
                      price: subscriptions[key].price,
                      billingPeriod: subscriptions[key].billingPeriod,
                      description: subscriptions[key].description,
                      startDate: subscriptions[key].startDate,
                    })
                  }
                  variant="default"
                  title={subscriptions[key].name}
                  color="#FF3D00"
                  icon="storytel"
                  info={`${subscriptions[key].price}kr / ${subscriptions[key].billingPeriod}`}
                />
              )}
              {subscriptions[key].name === "Disney+" && (
                <Card
                  onPress={() =>
                    navigation.navigate("SubscriptionInfo", {
                      name: subscriptions[key].name,
                      price: subscriptions[key].price,
                      billingPeriod: subscriptions[key].billingPeriod,
                      description: subscriptions[key].description,
                      startDate: subscriptions[key].startDate,
                    })
                  }
                  variant="default"
                  title={subscriptions[key].name}
                  color="#0097EC"
                  icon="disney"
                  info={`${subscriptions[key].price}kr / ${subscriptions[key].billingPeriod}`}
                />
              )}
              {subscriptions[key].name === "GP" && (
                <Card
                  onPress={() =>
                    navigation.navigate("SubscriptionInfo", {
                      name: subscriptions[key].name,
                      price: subscriptions[key].price,
                      billingPeriod: subscriptions[key].billingPeriod,
                      description: subscriptions[key].description,
                      startDate: subscriptions[key].startDate,
                    })
                  }
                  variant="default"
                  title={subscriptions[key].name}
                  color="#4443BC"
                  icon="gp"
                  info={`${subscriptions[key].price}kr / ${subscriptions[key].billingPeriod}`}
                />
              )}
            </Pressable>
          ))}
        </View>
        {/* <CTAButtonBig
          title="Lägg till prenumation"
          onPress={() => navigation.navigate("AddSubscription")}
        />
        <CTAButtonBig title="Logga ut" onPress={signOut} /> */}
      </View>
      {/* <Navbar navigation={navigation} /> */}
    </SafeAreaView>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: "Inter_600SemiBold",
    color: "black",
  },
});
