import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { getAuth } from "firebase/auth";
import { Card } from "../src/Components/Card/Card";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { CTAButtonSmall } from "../src/Components/CTAButton/CTAButtonSmall";
import { CTAButtonBig } from "../src/Components/CTAButton/CTAButtonBig";
import { ref, set, getDatabase, get, push } from "firebase/database";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { HeaderContainer } from "../src/Components/HeaderContainer/HeaderContainer";
import { Navbar } from "../src/Components/Navbar/Navbar";
import { useRef } from "react";
import { Image } from "expo-image";
import { schedulePushNotification } from "../src/Components/NotficationHandler/NotificationHandler";

const AddSubscriptionScreen = ({ navigation }) => {
  const plans = {
    Netflix: {
      Basic: {
        price: "99",
        billingPeriod: "månad",
      },
      Standard: {
        price: "128",
        billingPeriod: "månad",
      },
      Premium: {
        price: "179",
        billingPeriod: "månad",
      },
    },

    "HBO Max": {
      Standard: {
        price: "109",
        billingPeriod: "månad",
      },
      "Standard Yearly": {
        price: "699",
        billingPeriod: "år",
      },
    },

    Spotify: {
      Premium: {
        price: "119",
        billingPeriod: "månad",
      },
      Duo: {
        price: "149",
        billingPeriod: "månad",
      },
      Family: {
        price: "189",
        billingPeriod: "månad",
      },
      Student: {
        price: "65",
        billingPeriod: "månad",
      },
    },

    "Amazon Prime": {
      "Prime monthly": {
        price: "59",
        billingPeriod: "månad",
      },
      "Prime yearly": {
        price: "549",
        billingPeriod: "år",
      },
    },

    Storytel: {
      Premium: {
        price: "169",
        billingPeriod: "månad",
      },
      Basic: {
        price: "129",
        billingPeriod: "månad",
      },
      Unlimited: {
        price: "229",
        billingPeriod: "månad",
      },
      Family: {
        price: "228",
        billingPeriod: "månad",
      },
    },

    "Disney+": {
      "Disney Plus Monthly": {
        price: "89",
        billingPeriod: "månad",
      },
      "Disney Plus Yearly": {
        price: "979",
        billingPeriod: "år",
      },
    },

    GP: {
      Nyhetssajt: {
        price: "139",
        billingPeriod: "månad",
      },
      Digital: {
        price: "279",
        billingPeriod: "månad",
      },
      "Digital och papper": {
        price: "399",
        billingPeriod: "månad",
      },
    },
  };

  const colorsPicture = {
    Netflix: {
      color: "#E60000",
      picture: require("../assets/logoImages/netflix.png"),
    },
    "HBO Max": {
      color: "#9C00AF",
      picture: require("../assets/logoImages/hbo.png"),
    },
    "Amazon Prime": {
      color: "#0097EC",
      picture: require("../assets/logoImages/prime.png"),
    },
    Spotify: {
      color: "#00863F",
      picture: require("../assets/logoImages/spotify.png"),
    },
    Storytel: {
      color: "#FF3D00",
      picture: require("../assets/logoImages/storytel.png"),
    },
    "Disney+": {
      color: "#0097EC",
      picture: require("../assets/logoImages/disney.png"),
    },
    GP: {
      color: "#4443BC",
      picture: require("../assets/logoImages/gp.png"),
    },
  };

  const auth = getAuth();
  const user = auth.currentUser;
  const isStateUpdated = useRef(false);

  const [startViewVisible, setStartViewVisible] = useState(true);
  const [customNameVisible, setCustomNameVisible] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [planVisible, setPlanVisible] = useState(false);
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

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const removedTime = date.toLocaleDateString();
    setStartDate(removedTime);
  }, [date]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    startDateVisible = (Platform.OS === 'ios');
    //setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  //add all data to database
  async function addData() {
    const db = getDatabase();
    const newSubscriptionRef = push(ref(db, "users/" + user.uid));

    try {
      await set(newSubscriptionRef, {
        name: name,
        billingPeriod: billingPeriod,
        price: price,
        startDate: startDate,
        description: description,
        type: type,
        plan: plan,
      });
      schedulePushNotification("Prenumeration tillagd!");
    } catch (error) {
      console.error("Error adding data: ", error);
    }
  }

  //weird solution to make sure the data is added to the database before navigating to the next screen when u press a plan.
  if (isStateUpdated.current) {
    addData();
    navigation.navigate("SubscriptionInfo", {
      name: name,
      plan: plan,
      price: price,
      billingPeriod: billingPeriod,
      description: description,
      startDate: startDate,
    });
  }

  return (
    <SafeAreaView
      style={{ height: "100%", width: "100%", backgroundColor: "#FFFFFF" }}
    >
      <HeaderContainer
        title="Prenumera"
        backArrow={() => {
          navigation.navigate("SubscriptionScreen");
        }}
      />
      <ScrollView
        id="startView"
        style={{
          paddingTop: 24,
          display: startViewVisible ? "flex" : "none",
          paddingHorizontal: 12,
        }}
      >
        <View style={{ gap: 12, marginBottom: 110 }}>
          <Card
            onPress={() => {
              setType("custom");
              setPlan("");
              setStartViewVisible(false);
              setCustomNameVisible(true); // Show customName view;
            }}
            variant="basic"
            title="Lägg till egen"
            color="#FFFFFF"
            icon="plus"
          />

          {/* preset */}
          <Card
            onPress={() => {
              setType("preset");
              setStartViewVisible(false);
              setPlanVisible(true);
              setName("Netflix"); // Show customName view;
            }}
            variant="default"
            title="Netflix"
            color="#E60000"
            icon="netflix"
          />
          <Card
            onPress={() => {
              setType("preset");
              setStartViewVisible(false);
              setPlanVisible(true);
              setName("HBO Max"); // Show customName view;
            }}
            variant="default"
            title="HBO Max"
            color="#9C00AF"
            icon="hbo"
          />
          <Card
            onPress={() => {
              setType("preset");
              setStartViewVisible(false);
              setPlanVisible(true);
              setName("Amazon Prime"); // Show customName view;
            }}
            variant="default"
            title="Amazon Prime"
            color="#0097EC"
            icon="prime"
          />
          <Card
            onPress={() => {
              setType("preset");
              setStartViewVisible(false);
              setPlanVisible(true);
              setName("Spotify"); // Show customName view;
            }}
            variant="default"
            title="Spotify"
            color="#00863F"
            icon="spotify"
          />
          <Card
            onPress={() => {
              setType("preset");
              setStartViewVisible(false);
              setPlanVisible(true);
              setName("Storytel"); // Show customName view;
            }}
            variant="default"
            title="Storytel"
            color="#FF3D00"
            icon="storytel"
          />
          <Card
            onPress={() => {
              setType("preset");
              setStartViewVisible(false);
              setPlanVisible(true);
              setName("Disney+"); // Show customName view;
            }}
            variant="default"
            title="Disney+"
            color="#0097EC"
            icon="disney"
          />
          <Card
            onPress={() => {
              setType("preset");
              setStartViewVisible(false);
              setPlanVisible(true);
              setName("GP"); // Show customName view;
            }}
            variant="default"
            title="GP"
            color="#4443BC"
            icon="gp"
          />
        </View>
      </ScrollView>
      {/* All the views for setting props */}
      <ScrollView
        id="presetPlan"
        style={{
          paddingHorizontal: 12,
          display: planVisible ? "flex" : "none",
        }}
      >
        {colorsPicture[name] && (
          <View
            style={{
              width: "100%",
              height: 200,
              backgroundColor: colorsPicture[name].color,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12,
              marginVertical: 24,
            }}
          >
            <Image
              style={{ width: 64, height: 64, borderRadius: 12 }}
              source={colorsPicture[name].picture}
            />
          </View>
        )}
        <View>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Inter_600SemiBold",
              lineHeight: 28,
              marginBottom: 12,
            }}
          >
            Välj plan
          </Text>
          <View style={{ gap: 12, marginBottom: 110 }}>
            {plans[name] && (
              <React.Fragment>
                {Object.keys(plans[name]).map((key) => (
                  <Card
                    key={key}
                    variant="basic"
                    title={key}
                    onPress={() => {
                      setPlan(key);
                      setPrice(plans[name][key].price);
                      setBillingPeriod(plans[name][key].billingPeriod);
                      setDescription("");
                      setStartDate("");
                      isStateUpdated.current = true;
                    }}
                  />
                ))}
              </React.Fragment>
            )}
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        id="customName"
        style={{
          marginTop: "26%",
          paddingHorizontal: 12,

          display: customNameVisible ? "flex" : "none",
        }}
      >
        <Text
          style={{
            fontSize: 36,
            marginBottom: 64,
            fontFamily: "Inter_600SemiBold",
            alignSelf: "center",
          }}
        >
          Namn
        </Text>
        <Text
          style={{
            fontSize: 12,
            marginBottom: 8,
            fontFamily: "Inter_400Regular",
            lineHeight: 16,
            alignSelf: "flex-start",
          }}
        >
          Skriv in namnet på din prenumeration
        </Text>
        <TextInput
          placeholder="Skriv här ..."
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <View
          style={{
            justifyContent: "space-between",
            marginTop: 12,
            flexDirection: "row",
          }}
        >
          <CTAButtonSmall
            title="Tillbaka"
            variant="secondary"
            onPress={() => {
              setName("");
              setCustomNameVisible(false);
              setStartViewVisible(true);
            }}
          />
          <CTAButtonSmall
            title="Nästa"
            variant="primary"
            onPress={() => {
              if (name === "") {
                alert("Du måste skriva in ett namn");
              } else {
                setCustomNameVisible(false);
                setBillingPeriodVisible(true);
              }
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <SafeAreaView
        id="billingPeriod"
        style={{
          paddingHorizontal: 12,
          marginTop: "26%",
          display: billingPeriodVisible ? "flex" : "none",
        }}
      >
        <Text
          style={{
            fontSize: 30,

            fontFamily: "Inter_600SemiBold",
            alignSelf: "center",
          }}
        >
          Faktureringsperiod
        </Text>
        {/* <Text
          style={{
            fontSize: 12,
            marginBottom: 8,
            fontFamily: "Inter_400Regular",
            lineHeight: 16,
            alignSelf: "flex-start",
          }}
        >
          Välj din Faktureringsperiod
        </Text> */}
        <Picker
          selectedValue={billingPeriod}
          onValueChange={(itemValue, itemIndex) => setBillingPeriod(itemValue)}
        >
          <Picker.Item label="Välj" value="" />
          <Picker.Item label="Månad" value="månad" />
          <Picker.Item label="Kvartal" value="kvartal" />
          <Picker.Item label="År" value="år" />
        </Picker>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CTAButtonSmall
            title="Tillbaka"
            variant="secondary"
            onPress={() => {
              if (type === "preset") {
                setBillingPeriodVisible(false);
                setStartViewVisible(true);
                setBillingPeriod("");
                setName("");
              } else {
                setBillingPeriodVisible(false);
                setCustomNameVisible(true);
              }
            }}
          />

          <CTAButtonSmall
            title="Nästa"
            variant="primary"
            onPress={() => {
              if (billingPeriod === "") {
                alert("Du måste välja en faktureringsperiod");
              } else {
                setBillingPeriodVisible(false);
                setPriceVisible(true);
              }
            }}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView
        id="price"
        style={{
          paddingHorizontal: 12,
          marginTop: "26%",
          display: priceVisible ? "flex" : "none",
        }}
      >
        <Text
          style={{
            fontSize: 36,
            marginBottom: 64,
            fontFamily: "Inter_600SemiBold",
            alignSelf: "center",
          }}
        >
          Pris
        </Text>
        <Text
          style={{
            fontSize: 12,
            marginBottom: 8,
            fontFamily: "Inter_400Regular",
            lineHeight: 16,
            alignSelf: "flex-start",
          }}
        >
          Skriv i priset du betalar per {billingPeriod}
        </Text>
        <TextInput
          placeholder="Skriv här ..."
          value={price}
          onChangeText={(text) => {
            // Using a regular expression to allow only numeric input
            text = text.replace(/[^0-9]/g, "");
            setPrice(text);
          }}
          inputMode="numeric" // This prop restricts the keyboard to show only numeric input
          style={styles.input}
          returnKeyType="done"
        />
        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CTAButtonSmall
            title="Tillbaka"
            variant="secondary"
            onPress={() => {
              setPrice("");
              setPriceVisible(false);
              setBillingPeriodVisible(true);
            }}
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
      </SafeAreaView>
      <SafeAreaView
        id="startDate"
        style={{
          paddingHorizontal: 12,
          marginTop: "26%",
          display: startDateVisible ? "flex" : "none",
        }}
      >
        <Text
          style={{
            fontSize: 36,

            fontFamily: "Inter_600SemiBold",
            alignSelf: "center",
          }}
        >
          Startdatum
        </Text>
        {/* <Text
          style={{
            fontSize: 12,
            marginBottom: 8,
            fontFamily: "Inter_400Regular",
            lineHeight: 16,
            alignSelf: "flex-start",
          }}
        >
          Skriv i datumet du började din prenumeration
        </Text> */}
        {startDateVisible && (
          <DateTimePicker
            style={{ height: 200 }}
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            onChange={onChange}
            display="spinner"
          />
        )}

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CTAButtonSmall
            title="Tillbaka"
            variant="secondary"
            onPress={() => {
              setStartDate("");
              setStartDateVisible(false);
              setPriceVisible(true);
            }}
          />
          <CTAButtonSmall
            title="Nästa"
            variant="primary"
            onPress={() => {
              if (startDate === "") {
                alert("Du måste välja ett startdatum");
              } else {
                // const startDateConversion = startDate.toLocaleDateString();
                // setStartDate(startDateConversion);

                setStartDateVisible(false);
                setDescriptionVisible(true);
              }
            }}
          />
        </View>
      </SafeAreaView>
      <SafeAreaView
        id="description "
        style={{
          paddingHorizontal: 12,
          marginTop: "26%",
          display: descriptionVisible ? "flex" : "none",
        }}
      >
        <Text
          style={{
            fontSize: 36,
            marginBottom: 64,
            fontFamily: "Inter_600SemiBold",
            alignSelf: "center",
          }}
        >
          Beskrivning
        </Text>
        <Text
          style={{
            fontSize: 12,
            marginBottom: 8,
            fontFamily: "Inter_400Regular",
            lineHeight: 16,
            alignSelf: "flex-start",
          }}
        >
          Skriv en beskrivning av din prenumation
        </Text>
        <TextInput
          placeholder="Skriv här ..."
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={styles.input}
        />

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CTAButtonSmall
            title="Tillbaka"
            variant="secondary"
            onPress={() => {
              setDescription("");
              setDescriptionVisible(false);
              setStartDateVisible(true);
            }}
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
      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
};

export default AddSubscriptionScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 5,
    borderWidth: 2,
    borderColor: "#7D7D7D",
    height: 46,
  },
});
