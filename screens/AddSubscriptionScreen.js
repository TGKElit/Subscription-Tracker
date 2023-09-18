import { View, Text, SafeAreaView, TextInput } from "react-native";
import { getAuth } from "firebase/auth";
import { Card } from "../src/Components/Card/Card";
import React from "react";
import { useState } from "react";
import { CTAButtonBig } from "../src/Components/CTAButton/CTAButtonBig";
import { StyleSheet } from "react-native";
import { CTAButtonSmall } from "../src/Components/CTAButton/CTAButtonSmall";
import { ref, set, getDatabase, get, push } from "firebase/database";
import { Picker } from "@react-native-picker/picker";

const AddSubscriptionScreen = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [startViewVisible, setStartViewVisible] = useState(true);
  const [customNameVisible, setCustomNameVisible] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [plan, setPlan] = useState("");
  const [billingPeriodVisible, setBillingPeriodVisible] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState("");
  const [priceVisible, setPriceVisible] = useState(false);
  const [price, setPrice] = useState("");
  const [startDateVisible, setStartDateVisible] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [description, setDescription] = useState("");
  function addData() {
    const db = getDatabase();
    const newSubscriptionRef = push(ref(db, "users/" + user.uid));
    set(newSubscriptionRef, {
      name: name,
      billingPeriod: billingPeriod,
      price: price,
      startDate: startDate,
      description: description,
    });
    console.log("data added", newSubscriptionRef.key);
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Welcome {user.email} </Text>
        <Text>Hej du har nått add subscriton sidan</Text>
      </View>
      <View
        id="startView"
        style={{ display: startViewVisible ? "flex" : "none" }}
      >
        <CTAButtonBig
          title="Lägg till"
          onPress={() => {
            console.log("tryckt");
            setStartViewVisible(false);
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
            if (name === "") {
              alert("Du måste skriva in ett namn");
            } else {
              console.log(name);
              setCustomNameVisible(false);
              setBillingPeriodVisible(true);
            }
          }}
        />
      </View>
      <View
        id="billingPeriod"
        style={{ display: billingPeriodVisible ? "flex" : "none" }}
      >
        <Text>Faktureringsperiod</Text>
        <Text>Välj din Faktureringsperiod</Text>
        {/* <TextInput
          placeholder="Skriv här ..."
          value={billingPeriod}
          onChangeText={(text) => setBillingPeriod(text)}
          style={styles.input}
        /> */}
        <Picker
          selectedValue={billingPeriod}
          onValueChange={(itemValue, itemIndex) => setBillingPeriod(itemValue)}
        >
          <Picker.Item label="Månad" value="month" />
          <Picker.Item label="Kvartal" value="quarter" />
          <Picker.Item label="Yearly" value="year" />
        </Picker>

        <CTAButtonSmall
          title="Nästa"
          variant="primary"
          onPress={() => {
            console.log(name);
            setBillingPeriodVisible(false);
            setPriceVisible(true);
          }}
        />
      </View>
      <View id="price" style={{ display: priceVisible ? "flex" : "none" }}>
        <Text>Pris</Text>
        <Text>Skriv i priset du betalar per månad</Text>
        <TextInput
          placeholder="Skriv här ..."
          value={price}
          onChangeText={(text) => setPrice(text)}
          style={styles.input}
        />
        <CTAButtonSmall
          title="Nästa"
          variant="primary"
          onPress={() => {
            setPriceVisible(false);
            setStartDateVisible(true);
          }}
        />
      </View>
      <View
        id="startDate"
        style={{ display: startDateVisible ? "flex" : "none" }}
      >
        <Text>Startdatum</Text>
        <Text>Välj startdatum</Text>
        <TextInput
          placeholder="Skriv här ..."
          value={startDate}
          onChangeText={(text) => setStartDate(text)}
          style={styles.input}
        />
        <CTAButtonSmall
          title="Nästa"
          variant="primary"
          onPress={() => {
            setStartDateVisible(false);
            setDescriptionVisible(true);
          }}
        />
      </View>
      <View
        id="description "
        style={{ display: descriptionVisible ? "flex" : "none" }}
      >
        <Text>Beskrivning</Text>
        <Text>Skriv en beskrivning av din prenumation</Text>
        <TextInput
          placeholder="Skriv här ..."
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={styles.input}
        />
        <CTAButtonSmall
          title="Nästa"
          variant="primary"
          onPress={() => {
            setDescriptionVisible(false);
            addData();
            navigation.navigate("SubscriptionScreen");
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
