import { View, Text, SafeAreaView, TextInput, Pressable } from "react-native";
import { getAuth } from "firebase/auth";
import { Card } from "../src/Components/Card/Card";
import React from "react";
import { useState } from "react";
import { CTAButtonBig } from "../src/Components/CTAButton/CTAButtonBig";
import { StyleSheet } from "react-native";
import { CTAButtonSmall } from "../src/Components/CTAButton/CTAButtonSmall";
import { ref, set, getDatabase, get, push } from "firebase/database";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

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

  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [description, setDescription] = useState("");

  //Datepicker
  const [startDate, setStartDate] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    // const selectedDateOnly = new Date(
    //   currentDate.getFullYear(),
    //   currentDate.getMonth(),
    //   currentDate.getDate()
    // );
    setStartDate(currentDate);
    // setStartDate(selectedDateOnly);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  //add all data to database
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
        <Picker
          selectedValue={billingPeriod}
          onValueChange={(itemValue, itemIndex) => setBillingPeriod(itemValue)}
        >
          <Picker.Item label="Välj" value="" />
          <Picker.Item label="Månad" value="månad" />
          <Picker.Item label="Kvartal" value="kvartal" />
          <Picker.Item label="År" value="år" />
        </Picker>

        <CTAButtonSmall
          title="Nästa"
          variant="primary"
          onPress={() => {
            if (billingPeriod === "") {
              alert("Du måste välja en faktureringsperiod");
            } else {
              console.log(name);
              setBillingPeriodVisible(false);
              setPriceVisible(true);
            }
          }}
        />
      </View>
      <View id="price" style={{ display: priceVisible ? "flex" : "none" }}>
        <Text>Pris</Text>
        <Text>Skriv i priset du betalar per {billingPeriod}</Text>
        <TextInput
          placeholder="Skriv här ..."
          value={price}
          onChangeText={(text) => {
            // Using a regular expression to allow only numeric input
            text = text.replace(/[^0-9]/g, "");
            setPrice(text);
          }}
          keyboardType="numeric" // This prop restricts the keyboard to show only numeric input
          style={styles.input}
        />
        <CTAButtonSmall
          title="Nästa"
          variant="primary"
          onPress={() => {
            if (price === "") {
              alert("Du måste skriva in ett pris");
            } else {
              setPriceVisible(false);
              setStartDateVisible(true);
            }
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
          placeholder="dag/månad/år"
          value={startDate}
          onChangeText={(text) => setStartDate(text)}
          style={styles.input}
        />

        {/* <CTAButtonBig onPress={showDatepicker} title="Pick a date" />
        <Text>{startDate.toLocaleDateString()}</Text>
        <Text>selected: {startDate.toLocaleDateString()}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )} */}
        {/* <Text>selected: {startDate.toLocaleString()}</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={startDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={() => {
            setStartDate(startDate);
          }}
        /> */}

        <CTAButtonSmall
          title="Nästa"
          variant="primary"
          onPress={() => {
            if (startDate === "") {
              alert("Du måste välja ett startdatum");
            } else {
              // const startDateConversion = startDate.toLocaleDateString();
              // setStartDate(startDateConversion);

              console.log(startDate);
              setStartDateVisible(false);
              setDescriptionVisible(true);
            }
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
