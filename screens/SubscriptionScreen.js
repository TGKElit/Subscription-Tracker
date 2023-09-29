import { ScrollView, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth } from "firebase/auth";

import { useState } from "react";
import { HeaderContainer } from "../src/Components/HeaderContainer/HeaderContainer";
import { ref, getDatabase, get } from "firebase/database";
import { Navbar } from "../src/Components/Navbar/Navbar";
import { useFocusEffect } from "@react-navigation/native";

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
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
    <SafeAreaView
      style={{ height: "100%", width: "100%", backgroundColor: "#FFFFFF" }}
    >
      <HeaderContainer
        title="Prenumerationer"
        navigation={navigation}
        addSubscription={true}
      />
      <ScrollView>
        <View style={{ paddingHorizontal: 12, marginBottom: 110 }}>
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
              borderColor: "#7D7D7D",
            }}
          >
            <Text style={{ fontSize: 12, fontFamily: "Inter_400Regular" }}>
              Denna månaden kommer du att betala:
            </Text>
            <Text style={{ fontSize: 36, fontFamily: "Inter_700Bold" }}>
              {totalCost.toFixed(0)} kr
            </Text>
          </View>

          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: 24, fontFamily: "Inter_600SemiBold" }}>
              Prenumationer
            </Text>

            {Object.keys(subscriptions).map((key) => (
              <React.Fragment key={key}>
                {subscriptions[key].type === "custom" && (
                  <Card
                    onPress={() =>
                      navigation.navigate("SubscriptionInfo", {
                        name: subscriptions[key].name,
                        price: subscriptions[key].price,
                        billingPeriod: subscriptions[key].billingPeriod,
                        description: subscriptions[key].description,
                        startDate: subscriptions[key].startDate,
                        plan: subscriptions[key].plan,
                      })
                    }
                    variant="default"
                    title={subscriptions[key].name}
                    color="#FC9100"
                    info={`${subscriptions[key].price}kr / ${subscriptions[key].billingPeriod}`}
                    icon="default"
                    iconColor="blue"
                  />
                )}
                {subscriptions[key].name === "Netflix" && (
                  <Card
                    onPress={() =>
                      navigation.navigate("SubscriptionInfo", {
                        name: subscriptions[key].name,
                        price: subscriptions[key].price,
                        billingPeriod: subscriptions[key].billingPeriod,
                        description: subscriptions[key].description,
                        startDate: subscriptions[key].startDate,
                        plan: subscriptions[key].plan,
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
                        plan: subscriptions[key].plan,
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
                        plan: subscriptions[key].plan,
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
                        plan: subscriptions[key].plan,
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
                        plan: subscriptions[key].plan,
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
                        plan: subscriptions[key].plan,
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
                        plan: subscriptions[key].plan,
                      })
                    }
                    variant="default"
                    title={subscriptions[key].name}
                    color="#4443BC"
                    icon="gp"
                    info={`${subscriptions[key].price}kr / ${subscriptions[key].billingPeriod}`}
                  />
                )}
              </React.Fragment>
            ))}
            <Card
              onPress={() => {
                navigation.navigate("AddSubscription"); // Show customName view;
              }}
              variant="basic"
              title="Lägg till egen"
              color="#FFFFFF"
              icon="plus"
            />
          </View>
        </View>
      </ScrollView>
      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
};

export default SubscriptionScreen;
