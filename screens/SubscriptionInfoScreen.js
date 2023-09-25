import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderContainer } from "../src/Components/HeaderContainer/HeaderContainer";
import { Card } from "../src/Components/Card/Card";
import { Navbar } from "../src/Components/Navbar/Navbar";
import Svg, { Path } from "react-native-svg";
import { InfoBox } from "../src/Components/InfoBox/InfoBox";
import { InfoBoxEditable } from "../src/Components/InfoBox/InfoBoxEditable";
import { CTAButtonBig } from "../src/Components/CTAButton/CTAButtonBig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, set, getDatabase, get, update } from "firebase/database";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect } from "react";
import { useRef } from "react";
import { Picker } from "@react-native-picker/picker";

const SubscriptionInfo = ({ route, navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [subscriptions, setSubscriptions] = useState([]);
  const [targetDataKey, setTargetDataKey] = useState("");
  const [billingPeriodVisible, setBillingPeriodVisible] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");
  const [plan, setPlan] = useState("");

  useEffect(() => {
    getData();
    setBillingPeriod(route.params.billingPeriod);
    setPrice(route.params.price);
    setStartDate(route.params.startDate);
    setDescription(route.params.description);
    setPlan(route.params.plan);
  }, []);

  useEffect(() => {
    console.log(subscriptions);
    findTarget();
    console.log(price);
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

  function updateData(uniqueID) {
    const db = getDatabase();
    const subscriptionRef = ref(db, `users/${user.uid}/${uniqueID}`); // Use template literal to construct the path

    const updates = {}; // Create an object to hold the updates

    // Add only the fields you want to update
    updates["billingPeriod"] = billingPeriod;
    updates["description"] = description;
    updates["plan"] = plan;
    updates["price"] = price;
    updates["startDate"] = startDate;

    update(subscriptionRef, updates)
      .then(() => {
        console.log("Data updated");
      })
      .catch((error) => {
        console.error(error);
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
        setTargetDataKey(key);
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
                  <Text>{plan}</Text>
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
              info={billingPeriod}
              variant="primary"
              onPress={() => {
                console.log("pressed");
                setBillingPeriodVisible(true);
              }}
            />
            <Pressable style={styles.containerPrimary}>
              <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16 }}>
                Pris
              </Text>
              <TextInput
                style={{
                  fontFamily: "Inter_400Regular",
                  fontSize: 16,
                  width: "50%",
                }}
                inputMode="numeric"
                value={price}
                onChangeText={(text) => setPrice(text)}
              />
              <View style={{ alignSelf: "flex-end" }}>
                <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <Path
                    d="M7 25H6C6 25.2652 6.10536 25.5196 6.2929 25.7071C6.48043 25.8946 6.73479 26 7.00001 26L7 25ZM7 20.3804L6.29289 19.6733C6.10536 19.8608 6 20.1152 6 20.3804H7ZM19.5521 7.82824L18.845 7.12113L18.845 7.12114L19.5521 7.82824ZM22.1654 7.82824L21.4582 8.53535L21.4582 8.53535L22.1654 7.82824ZM24.1717 9.8346L24.8788 9.12749V9.12749L24.1717 9.8346ZM24.1717 12.4478L23.4646 11.7407V11.7407L24.1717 12.4478ZM11.6196 25L11.6196 26C11.8848 26 12.1392 25.8946 12.3267 25.7071L11.6196 25ZM24.9435 10.7844L25.8945 10.4754L24.9435 10.7844ZM24.9435 11.4981L23.9924 11.189L24.9435 11.4981ZM20.5019 7.05652L20.1929 6.10547L20.5019 7.05652ZM21.2157 7.05652L21.5247 6.10547L21.2157 7.05652ZM16.9463 10.4341C16.5558 10.0436 15.9226 10.0436 15.5321 10.4341C15.1415 10.8247 15.1415 11.4578 15.5321 11.8483L16.9463 10.4341ZM20.1517 16.4679C20.5422 16.8585 21.1753 16.8585 21.5659 16.4679C21.9564 16.0774 21.9564 15.4442 21.5659 15.0537L20.1517 16.4679ZM8 25V20.3804H6V25H8ZM7.70711 21.0875L20.2593 8.53535L18.845 7.12114L6.29289 19.6733L7.70711 21.0875ZM21.4582 8.53535L23.4646 10.5417L24.8788 9.12749L22.8725 7.12113L21.4582 8.53535ZM23.4646 11.7407L10.9125 24.2929L12.3267 25.7071L24.8788 13.1549L23.4646 11.7407ZM11.6196 24L6.99999 24L7.00001 26L11.6196 26L11.6196 24ZM23.4646 10.5417C23.7049 10.782 23.8421 10.9203 23.9346 11.0293C24.0196 11.1293 24.0066 11.1371 23.9924 11.0934L25.8945 10.4754C25.7946 10.1679 25.6245 9.92952 25.4593 9.73493C25.3017 9.54925 25.0958 9.3445 24.8788 9.12749L23.4646 10.5417ZM24.8788 13.1549C25.0959 12.9379 25.3017 12.7332 25.4593 12.5475C25.6245 12.3529 25.7947 12.1145 25.8945 11.8071L23.9924 11.189C24.0066 11.1453 24.0195 11.1531 23.9346 11.2531C23.8422 11.3621 23.705 11.5004 23.4646 11.7407L24.8788 13.1549ZM23.9924 11.0934C24.0025 11.1245 24.0025 11.1579 23.9924 11.189L25.8945 11.8071C26.0352 11.3743 26.0352 10.9082 25.8945 10.4754L23.9924 11.0934ZM20.2592 8.53535C20.4996 8.29501 20.6379 8.15783 20.7468 8.06536C20.8468 7.98046 20.8546 7.99339 20.8109 8.00758L20.1929 6.10547C19.8855 6.20534 19.6471 6.37544 19.4525 6.54065C19.2668 6.69828 19.0621 6.90411 18.845 7.12113L20.2592 8.53535ZM22.8725 7.12113C22.6555 6.90417 22.4508 6.69833 22.2652 6.54072C22.0706 6.37552 21.8322 6.20537 21.5247 6.10547L20.9067 8.00758C20.8629 7.99336 20.8707 7.98039 20.9707 8.06529C21.0796 8.15778 21.2179 8.29496 21.4582 8.53535L22.8725 7.12113ZM20.8109 8.00758C20.842 7.99747 20.8756 7.99747 20.9067 8.00758L21.5247 6.10547C21.0919 5.96484 20.6257 5.96484 20.1929 6.10547L20.8109 8.00758ZM15.5321 11.8483L20.1517 16.4679L21.5659 15.0537L16.9463 10.4341L15.5321 11.8483Z"
                    fill="black"
                  />
                </Svg>
              </View>
            </Pressable>
            {/* <InfoBoxEditable
              title="Pris"
              value={price}
              // Convert price to string for input value
              variant="primary"
              keyBoardType="numeric"
              onChangeText={(text) => setPrice(text)}
            /> */}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "4%",
              width: "100%",
            }}
          >
            <InfoBox title="Startdatum" info={startDate} variant="primary" />
            <InfoBox title="Nästa betalning" info="no info" variant="primary" />
          </View>

          <Pressable style={styles.containerSecondary}>
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16 }}>
              Beskrivning
            </Text>
            <TextInput
              style={{
                fontFamily: "Inter_400Regular",
                fontSize: 16,
                width: "100%",
                height: "100%",
              }}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <View style={{ alignSelf: "flex-end" }}>
              <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <Path
                  d="M7 25H6C6 25.2652 6.10536 25.5196 6.2929 25.7071C6.48043 25.8946 6.73479 26 7.00001 26L7 25ZM7 20.3804L6.29289 19.6733C6.10536 19.8608 6 20.1152 6 20.3804H7ZM19.5521 7.82824L18.845 7.12113L18.845 7.12114L19.5521 7.82824ZM22.1654 7.82824L21.4582 8.53535L21.4582 8.53535L22.1654 7.82824ZM24.1717 9.8346L24.8788 9.12749V9.12749L24.1717 9.8346ZM24.1717 12.4478L23.4646 11.7407V11.7407L24.1717 12.4478ZM11.6196 25L11.6196 26C11.8848 26 12.1392 25.8946 12.3267 25.7071L11.6196 25ZM24.9435 10.7844L25.8945 10.4754L24.9435 10.7844ZM24.9435 11.4981L23.9924 11.189L24.9435 11.4981ZM20.5019 7.05652L20.1929 6.10547L20.5019 7.05652ZM21.2157 7.05652L21.5247 6.10547L21.2157 7.05652ZM16.9463 10.4341C16.5558 10.0436 15.9226 10.0436 15.5321 10.4341C15.1415 10.8247 15.1415 11.4578 15.5321 11.8483L16.9463 10.4341ZM20.1517 16.4679C20.5422 16.8585 21.1753 16.8585 21.5659 16.4679C21.9564 16.0774 21.9564 15.4442 21.5659 15.0537L20.1517 16.4679ZM8 25V20.3804H6V25H8ZM7.70711 21.0875L20.2593 8.53535L18.845 7.12114L6.29289 19.6733L7.70711 21.0875ZM21.4582 8.53535L23.4646 10.5417L24.8788 9.12749L22.8725 7.12113L21.4582 8.53535ZM23.4646 11.7407L10.9125 24.2929L12.3267 25.7071L24.8788 13.1549L23.4646 11.7407ZM11.6196 24L6.99999 24L7.00001 26L11.6196 26L11.6196 24ZM23.4646 10.5417C23.7049 10.782 23.8421 10.9203 23.9346 11.0293C24.0196 11.1293 24.0066 11.1371 23.9924 11.0934L25.8945 10.4754C25.7946 10.1679 25.6245 9.92952 25.4593 9.73493C25.3017 9.54925 25.0958 9.3445 24.8788 9.12749L23.4646 10.5417ZM24.8788 13.1549C25.0959 12.9379 25.3017 12.7332 25.4593 12.5475C25.6245 12.3529 25.7947 12.1145 25.8945 11.8071L23.9924 11.189C24.0066 11.1453 24.0195 11.1531 23.9346 11.2531C23.8422 11.3621 23.705 11.5004 23.4646 11.7407L24.8788 13.1549ZM23.9924 11.0934C24.0025 11.1245 24.0025 11.1579 23.9924 11.189L25.8945 11.8071C26.0352 11.3743 26.0352 10.9082 25.8945 10.4754L23.9924 11.0934ZM20.2592 8.53535C20.4996 8.29501 20.6379 8.15783 20.7468 8.06536C20.8468 7.98046 20.8546 7.99339 20.8109 8.00758L20.1929 6.10547C19.8855 6.20534 19.6471 6.37544 19.4525 6.54065C19.2668 6.69828 19.0621 6.90411 18.845 7.12113L20.2592 8.53535ZM22.8725 7.12113C22.6555 6.90417 22.4508 6.69833 22.2652 6.54072C22.0706 6.37552 21.8322 6.20537 21.5247 6.10547L20.9067 8.00758C20.8629 7.99336 20.8707 7.98039 20.9707 8.06529C21.0796 8.15778 21.2179 8.29496 21.4582 8.53535L22.8725 7.12113ZM20.8109 8.00758C20.842 7.99747 20.8756 7.99747 20.9067 8.00758L21.5247 6.10547C21.0919 5.96484 20.6257 5.96484 20.1929 6.10547L20.8109 8.00758ZM15.5321 11.8483L20.1517 16.4679L21.5659 15.0537L16.9463 10.4341L15.5321 11.8483Z"
                  fill="black"
                />
              </Svg>
            </View>
          </Pressable>
          <View style={{ marginTop: 12, marginBottom: 12 }}>
            <CTAButtonBig
              title="Spara"
              variant="primary"
              onPress={updateData(targetDataKey)}
            />
          </View>
          <View style={{ marginTop: 12, marginBottom: 24 }}>
            <CTAButtonBig title="Ta bort prenumation" variant="primary" />
          </View>
        </View>

        <View
          id="billingPeriod"
          style={{
            height: "50vh",
            width: "100%",
            position: "absolute",
            // justifyContent: "center",
            // alignItems: "center",
            backgroundColor: "white",
            top: 0,
            display: billingPeriodVisible ? "flex" : "none",
          }}
        >
          <Text>Faktureringsperiod</Text>
          <Text>Välj din Faktureringsperiod</Text>
          <Picker
            selectedValue={billingPeriod}
            onValueChange={(itemValue, itemIndex) =>
              setBillingPeriod(itemValue)
            }
          >
            <Picker.Item label="Välj" value="" />
            <Picker.Item label="Månad" value="månad" />
            <Picker.Item label="Kvartal" value="kvartal" />
            <Picker.Item label="År" value="år" />
          </Picker>
          <CTAButtonBig
            title="Spara"
            variant="primary"
            onPress={() => {
              if (billingPeriod === "") {
                alert("Du måste välja en faktureringsperiod");
              } else {
                setBillingPeriod(billingPeriod);
                setBillingPeriodVisible(false);
              }
            }}
          />
        </View>
      </ScrollView>
      <Navbar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerPrimary: {
    height: 75,
    width: "48%",
    padding: 10,
    borderRadius: 12,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  containerSecondary: {
    height: 132,
    width: "100%",
    padding: 10,
    borderRadius: 12,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
export default SubscriptionInfo;
