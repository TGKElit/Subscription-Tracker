import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderContainer } from "../src/Components/HeaderContainer/HeaderContainer";
import { Card } from "../src/Components/Card/Card";
import { Navbar } from "../src/Components/Navbar/Navbar";
import Svg, { Path } from "react-native-svg";
import { InfoBox } from "../src/Components/InfoBox/InfoBox";
import { CTAButtonBig } from "../src/Components/CTAButton/CTAButtonBig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, set, getDatabase, get } from "firebase/database";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect } from "react";
import { useRef } from "react";

const SubscriptionInfo = ({ route, navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [subscriptions, setSubscriptions] = useState([]);
  const [targetDataKey, setTargetDataKey] = useState([]);
  const [period, setPeriod] = useState("");
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");
  const [plan, setPlan] = useState("");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(subscriptions);
    findTarget();
  }, [subscriptions]);
  useEffect(() => {
    console.log(targetDataKey);
  }, [targetDataKey]);

  function getData() {
    const db = getDatabase();
    const userData = ref(db, "users/" + user.uid);
    get(userData)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setSubscriptions(snapshot.val());
          console.log(snapshot.val());
        } else {
          // console.log("No data available");
        }
      })
      .catch((error) => {
        // console.error(error);
      });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      const email = user.email;
      // console.log(uid);
      // console.log(email);
      // ...
    } else {
      console.log("no user");
      // User is signed out
      // ...
    }
  });
  const findTarget = () => {
    for (const key in subscriptions) {
      const subscription = subscriptions[key];
      if (
        subscription.name === route.params.name &&
        subscription.plan === route.params.plan &&
        subscription.price === route.params.price &&
        subscription.billingPeriod === route.params.billingPeriod &&
        subscription.startDate === route.params.startDate &&
        subscription.description === route.params.description
      ) {
        console.log("Match found:", key);
        setTargetDataKey(subscription);
        break; // Exit the loop after finding a match
      } else {
        console.log("no match");
      }
    }
  };

  return (
    <SafeAreaView style={{ height: "100%", width: "100vw" }}>
      <HeaderContainer title="Prenumerationer" />
      <ScrollView>
        <View style={{ paddingHorizontal: 12 }}>
          <View
            style={{
              width: "100%",
              height: 200,
              backgroundColor: "#FC9100",
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",

              marginVertical: 24,
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 48,
                color: "white",
              }}
            >
              {route.params.name}
            </Text>
          </View>

          <View>
            {route.params.plan !== "" && (
              <Pressable style={{ marginBottom: 24 }}>
                <Card title="Plan" variant="basic">
                  <Text>{route.params.plan}</Text>
                </Card>
              </Pressable>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "4%",
              width: "100%",
            }}
          >
            <InfoBox
              title="Period"
              valueInput={route.params.billingPeriod}
              variant="primary"
              onPress={() => {
                console.log("pressed");
              }}
            />
            <InfoBox
              title="Pris"
              valueInput={route.params.price + "kr"}
              variant="primary"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "4%",
              width: "100%",
            }}
          >
            <InfoBox
              title="Startdatum"
              valueInput={route.params.startDate}
              variant="primary"
            />
            <InfoBox title="Nästa betalning" info="no info" variant="primary" />
          </View>

          <InfoBox
            title="Beskrivning"
            valueInput={route.params.description}
            variant="secondary"
          />
          <View style={{ marginTop: 12, marginBottom: 24 }}>
            <CTAButtonBig title="Ta bort prenumation" variant="primary" />
          </View>
        </View>
      </ScrollView>
      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
};

export default SubscriptionInfo;
