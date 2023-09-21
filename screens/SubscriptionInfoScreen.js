import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderContainer } from "../src/Components/HeaderContainer/HeaderContainer";

const SubscriptionInfo = ({ route }) => {
  console.log(route);
  return (
    <SafeAreaView>
      <HeaderContainer title="Prenumerationer" />
      <View style={{ paddingHorizontal: 24 }}>
        <View
          style={{
            width: "100%",
            height: 200,
            backgroundColor: "#FC9100",
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
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
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              height: 75,
              width: "40vw",
              padding: 10,
              borderRadius: 12,
              borderWidth: 2,
            }}
          >
            <Text>Period</Text>
            <Text>{route.params.billingPeriod}</Text>
          </View>
          <View
            style={{
              height: 75,
              width: "40vw",
              padding: 10,
              borderRadius: 12,
              borderWidth: 2,
            }}
          >
            <Text>Pris</Text>
            <Text>{route.params.price}kr</Text>
          </View>
        </View>

        <View
          style={{
            height: 75,
            width: "50vw",
            padding: 10,
            borderRadius: 12,
            borderWidth: 2,
          }}
        >
          <Text>Startdatum</Text>
          <Text>{route.params.startDate}</Text>
        </View>
        <View
          style={{
            height: 75,
            width: "50vw",
            padding: 10,
            borderRadius: 12,
            borderWidth: 2,
          }}
        >
          <Text>Nästa betalning</Text>
        </View>

        <View
          style={{
            height: 75,
            width: "50vw",
            padding: 10,
            borderRadius: 12,
            borderWidth: 2,
          }}
        >
          <Text>Beskrivning</Text>
          <Text>{route.params.description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SubscriptionInfo;
