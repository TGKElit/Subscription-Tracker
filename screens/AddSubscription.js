import { View, Text, SafeAreaView, TextInput } from "react-native";
import { getAuth } from "firebase/auth";
import { Card } from "../src/Components/Card/Card";
import React from "react";
import { useState } from "react";
import { CTAButtonBig } from "../src/Components/CTAButton/CTAButtonBig";
import { StyleSheet } from "react-native";
import { CTAButtonSmall } from "../src/Components/CTAButton/CTAButtonSmall";

const AddSubscriptionScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [customNameVisible, setCustomNameVisible] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [plan, setPlan] = useState("");
  const [billingPeriod, setBillingPeriod] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");

  return (
    <SafeAreaView>
      <View>
        <Text>Welcome {user.email} </Text>
        <Text>Hej du har nått add subscriton sidan</Text>
      </View>
      <View
        id="startView"
        style={{ display: customNameVisible ? "none" : "flex" }}
      >
        <CTAButtonBig
          title="Lägg till"
          onPress={() => {
            console.log("tryckt");
            setCustomNameVisible(true); // Show customName view;
          }}
        />
      </View>
      <View
        id="customName"
        style={{ display: customNameVisible ? "flex" : "none" }}
      >
        <Text>Namn</Text>
        <Text>Skriv namn på din prenumation</Text>
        <TextInput
          placeholder="Skriv här ..."
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <CTAButtonSmall
          title="Nästa"
          variant="primary"
          onPress={() => {
            console.log(name);
            setCustomNameVisible(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddSubscriptionScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
});
