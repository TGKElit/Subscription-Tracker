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
import { CTAButtonBig } from "../src/Components/CTAButton/CTAButtonBig";
import { getAuth } from "firebase/auth";
import { ref, getDatabase, get, update, remove, set } from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CTAButtonSmall } from "../src/Components/CTAButton/CTAButtonSmall";
import { BlurView } from "expo-blur";
import { schedulePushNotification } from "../src/Components/NotficationHandler/NotificationHandler";

const SubscriptionInfo = ({ route, navigation }) => {
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
  const [subscriptions, setSubscriptions] = useState([]);
  const [targetDataKey, setTargetDataKey] = useState("");
  const [billingPeriodVisible, setBillingPeriodVisible] = useState(false);

  const [billingPeriod, setBillingPeriod] = useState("");
  const [price, setPrice] = useState("");
  const [startDateVisible, setStartDateVisible] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");
  const [plan, setPlan] = useState("");
  const [name, setName] = useState("");
  const [landingScreenVisible, setLandingScreenVisible] = useState(true);
  const [planVisible, setPlanVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  //set all params from SubscriptionScreen to states
  useEffect(() => {
    getData();
    setBillingPeriod(route.params.billingPeriod);
    setPrice(route.params.price);
    setStartDate(route.params.startDate);
    setDescription(route.params.description);
    setPlan(route.params.plan);
    setName(route.params.name);
    displayNextPayment(route.params.startDate);
  }, []);

  useEffect(() => {
    findTarget();
  }, [subscriptions]);

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

  //Update data in db

  function updateData(uniqueID) {
    const db = getDatabase();
    const subscriptionRef = ref(db, `users/${user.uid}/${uniqueID}`); // Use template literal to construct the path

    const updates = {}; // Create an object to hold the updates

    updates["billingPeriod"] = billingPeriod;
    updates["description"] = description;
    updates["plan"] = plan;
    updates["price"] = price;
    updates["startDate"] = startDate;

    update(subscriptionRef, updates)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
    schedulePushNotification("Prenumerationsinfo ändrad");
  }

  // Delete data form db
  function deleteData(uniqueID) {
    const db = getDatabase();
    const subscriptionRef = ref(db, `users/${user.uid}/${uniqueID}`);

    remove(subscriptionRef)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
    schedulePushNotification("Prenumeration borttagen");
  }

  //find right subscription in database
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
        setTargetDataKey(key);
        break; // Exit the loop after finding a match
      } else {
      }
    }
  };

  //blurview
  const [blurViewVisible, setBlurViewVisible] = useState(false);
  useEffect(() => {
    if (billingPeriodVisible || startDateVisible || deleteVisible) {
      setBlurViewVisible(true);
    } else {
      setBlurViewVisible(false);
    }
  }, [billingPeriodVisible, startDateVisible, deleteVisible]);

  //Datepicker

  useEffect(() => {
    displayNextPayment(startDate);
  }, [date]);

  useEffect(() => {
    displayNextPayment(startDate);
  }, [billingPeriod]);

  useEffect(() => {
    displayNextPayment(startDate);
  }, [startDate]);

  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    // startDateVisible = (Platform.OS === 'ios');
    setDate(currentDate);
    setStartDate(currentDate.toLocaleDateString());
  };

  //next payment
  const [nextPayment, setNextPayment] = useState("");

  function displayNextPayment(startDate) {
    if (startDate === "") {
      setNextPayment("Välj startdatum");
    } else {
      const [year, month, day] = startDate.split("-").map(Number);
      const startDateObject = new Date(year, month - 1, day);

      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      if (currentYear < startDateObject.getFullYear()) {
        if (billingPeriod === "månad") {
          startDateObject.setMonth(startDateObject.getMonth() + 1);
        } else if (billingPeriod === "kvartal") {
          startDateObject.setMonth(startDateObject.getMonth() + 3);
        } else if (billingPeriod === "år") {
          startDateObject.setFullYear(startDateObject.getFullYear() + 1);
        }
      } else {
        startDateObject.setFullYear(currentYear);
        if (
          billingPeriod === "månad" &&
          currentMonth > startDateObject.getMonth()
        ) {
          startDateObject.setMonth(currentMonth);
        } else if (
          billingPeriod === "månad" &&
          currentMonth < startDateObject.getMonth()
        ) {
          startDateObject.setMonth(startDateObject.getMonth() + 1);
        } else if (billingPeriod === "kvartal") {
          if (currentMonth <= startDateObject.getMonth() + 4) {
            startDateObject.setMonth(startDateObject.getMonth() + 3);
          } else if (currentMonth <= startDateObject.getMonth() + 7) {
            startDateObject.setMonth(startDateObject.getMonth() + 6);
          } else if (currentMonth <= startDateObject.getMonth() + 10) {
            startDateObject.setMonth(startDateObject.getMonth() + 9);
          } else if (currentMonth <= startDateObject.getMonth() + 13) {
            startDateObject.setMonth(startDateObject.getMonth() + 12);
          }
        } else if (
          billingPeriod === "år" &&
          currentMonth > startDateObject.getMonth()
        ) {
          startDateObject.setFullYear(currentYear + 1);
        } else if (
          billingPeriod === "år" &&
          currentMonth < startDateObject.getMonth()
        ) {
          startDateObject.setFullYear(currentYear);
        }
      }

      // Add one month

      // Format the date as YYYY-MM-DD
      const newDate = `${startDateObject.getFullYear()}-${String(
        startDateObject.getMonth() + 1
      ).padStart(2, "0")}-${String(startDateObject.getDate()).padStart(
        2,
        "0"
      )}`;
      setNextPayment(newDate);
    }
  }
  //Working on more accurate displayNextPayment function

  // function displayNextPayment(startDate) {
  //   if (startDate === "") {
  //     setNextPayment("Välj startdatum");
  //   } else {
  //     const [year, month, day] = startDate.split("-").map(Number);
  //     const startDateObject = new Date(year, month - 1, day);
  //     const currentYearStartDateObject = new Date();

  //     const currentYear = new Date().getFullYear();
  //     const currentMonth = new Date().getMonth() + 1;
  //     const currentDay = new Date().getDate();
  //     console.log(
  //       currentMonth,
  //       currentDay,
  //       startDateObject.getMonth(),
  //       startDateObject.getDate(),
  //       startDateObject.getFullYear()
  //     );

  //     if (currentYear < startDateObject.getFullYear()) {
  //       if (billingPeriod === "månad") {
  //         startDateObject.setMonth(startDateObject.getMonth() + 0);
  //       } else if (billingPeriod === "kvartal") {
  //         startDateObject.setMonth(startDateObject.getMonth() + 3);
  //       } else if (billingPeriod === "år") {
  //         startDateObject.setFullYear(startDateObject.getFullYear() + 1);
  //       }
  //     } else {
  //       startDateObject.setFullYear(currentYear);
  //       if (billingPeriod === "månad") {
  //         if (
  //           currentMonth === startDateObject.getMonth() &&
  //           currentDay === startDateObject.getDate()
  //         ) {
  //           console.log("sätt samma dag och månad");
  //           startDateObject.setMonth(startDateObject.getMonth() + 1);
  //         } else if (
  //           billingPeriod === "månad" &&
  //           currentMonth > startDateObject.getMonth() + 1 &&
  //           currentDay > startDateObject.getDate()
  //         ) {
  //           console.log("sätt 1 månad +");
  //           startDateObject.setMonth(currentMonth);
  //         } else if (
  //           billingPeriod === "månad" &&
  //           currentMonth === startDateObject.getMonth() + 1 &&
  //           currentDay > startDateObject.getDate()
  //         ) {
  //           console.log(currentYear, startDateObject.getFullYear());
  //           console.log("Sätt 1 månad + om samma månad men dag har gått");
  //           startDateObject.setMonth(startDateObject.getMonth() + 1);
  //           console.log(currentYear, startDateObject.getFullYear());
  //         } else if (startDateObject.getFullYear() > currentYear) {
  //           console.log("år i framtiden");
  //           startDateObject.setMonth(startDateObject.getMonth() + 1);
  //         } else {
  //           startDateObject.setMonth(currentMonth);
  //           console.log("något är fel");
  //         }

  //         // startDateObject.setMonth(startDateObject.getMonth() + 1);
  //       } else if (billingPeriod === "kvartal") {
  //         if (currentMonth <= startDateObject.getMonth()) {
  //           console.log("tjoho");
  //           startDateObject.setMonth(startDateObject.getMonth() + 0);
  //         } else if (
  //           currentMonth === startDateObject.getMonth() + 1 &&
  //           currentDay <= startDateObject.getDate()
  //         ) {
  //           console.log("hej");
  //           startDateObject.setMonth(startDateObject.getMonth() + 0);
  //         } else if (currentMonth <= startDateObject.getMonth() + 3) {
  //           console.log("hej 2");
  //           startDateObject.setMonth(startDateObject.getMonth() + 3);
  //         } else if (currentMonth <= startDateObject.getMonth() + 7) {
  //           startDateObject.setMonth(startDateObject.getMonth() + 6);
  //         } else if (currentMonth <= startDateObject.getMonth() + 10) {
  //           startDateObject.setMonth(startDateObject.getMonth() + 9);
  //         } else if (currentMonth <= startDateObject.getMonth() + 13) {
  //           startDateObject.setMonth(startDateObject.getMonth() + 12);
  //         }
  //       } else if (
  //         billingPeriod === "år" &&
  //         currentMonth > startDateObject.getMonth()
  //       ) {
  //         startDateObject.setFullYear(currentYear + 1);
  //       } else if (
  //         billingPeriod === "år" &&
  //         currentMonth < startDateObject.getMonth()
  //       ) {
  //         startDateObject.setFullYear(currentYear);
  //       }
  //     }

  //     // Add one month

  //     // Format the date as YYYY-MM-DD
  //     const newDate = `${startDateObject.getFullYear()}-${String(
  //       startDateObject.getMonth() + 1
  //     ).padStart(2, "0")}-${String(startDateObject.getDate()).padStart(
  //       2,
  //       "0"
  //     )}`;
  //     setNextPayment(newDate);
  //   }
  // }

  return (
    <SafeAreaView
      style={{ height: "100%", width: "100%", backgroundColor: "#FFFFFF" }}
    >
      <HeaderContainer
        title="Prenumerationer"
        backArrow={() => {
          navigation.navigate("SubscriptionScreen");
        }}
      />
      <ScrollView
        style={{
          marginBottom: 70,
          display: landingScreenVisible ? "flex" : "none",
        }}
      >
        <BlurView intensity={blurViewVisible ? 100 : 0} tint="dark">
          <SafeAreaView style={{ paddingHorizontal: 12 }}>
            {plan === "" && (
              <View
                style={{
                  width: "100%",
                  height: 200,
                  backgroundColor: "orange",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 12,
                  marginBottom: 24,
                }}
              >
                <Text
                  style={{
                    fontSize: 48,
                    fontFamily: "Inter_600SemiBold",
                    color: "white",
                  }}
                >
                  {name}
                </Text>
              </View>
            )}
            <React.Fragment>
              {colorsPicture[name] && (
                <View
                  style={{
                    width: "100%",
                    height: 200,
                    backgroundColor: colorsPicture[name].color,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 12,
                    marginBottom: 24,
                  }}
                >
                  <Image
                    style={{ width: 64, height: 64, borderRadius: 12 }}
                    source={colorsPicture[name].picture}
                  />
                  <Text
                    style={{
                      fontSize: 48,
                      fontFamily: "Inter_600SemiBold",
                      color: "white",
                    }}
                  >
                    {name}
                  </Text>
                </View>
              )}
            </React.Fragment>
            <View>
              {route.params.plan !== "" && (
                <Pressable style={{ marginBottom: 24 }}>
                  <Card
                    title="Plan"
                    info={plan}
                    variant="basic"
                    onPress={() => {
                      setPlanVisible(true);
                      setDeleteConfirmationVisible(true);
                      setLandingScreenVisible(false);
                    }}
                  />
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
                  if (plan === "") {
                    console.log(plan);
                    setBillingPeriodVisible(true);
                    setStartDateVisible(false);
                  }
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
                  editable={plan === "" ? true : false}
                  value={price}
                  onChangeText={(text) =>
                    setPrice(text) + setDeleteConfirmationVisible(true)
                  }
                  returnKeyType="done"
                />
                <View
                  style={{
                    alignSelf: "flex-end",
                    position: "absolute",
                    top: 0,
                  }}
                >
                  <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <Path
                      d="M7 25H6C6 25.2652 6.10536 25.5196 6.2929 25.7071C6.48043 25.8946 6.73479 26 7.00001 26L7 25ZM7 20.3804L6.29289 19.6733C6.10536 19.8608 6 20.1152 6 20.3804H7ZM19.5521 7.82824L18.845 7.12113L18.845 7.12114L19.5521 7.82824ZM22.1654 7.82824L21.4582 8.53535L21.4582 8.53535L22.1654 7.82824ZM24.1717 9.8346L24.8788 9.12749V9.12749L24.1717 9.8346ZM24.1717 12.4478L23.4646 11.7407V11.7407L24.1717 12.4478ZM11.6196 25L11.6196 26C11.8848 26 12.1392 25.8946 12.3267 25.7071L11.6196 25ZM24.9435 10.7844L25.8945 10.4754L24.9435 10.7844ZM24.9435 11.4981L23.9924 11.189L24.9435 11.4981ZM20.5019 7.05652L20.1929 6.10547L20.5019 7.05652ZM21.2157 7.05652L21.5247 6.10547L21.2157 7.05652ZM16.9463 10.4341C16.5558 10.0436 15.9226 10.0436 15.5321 10.4341C15.1415 10.8247 15.1415 11.4578 15.5321 11.8483L16.9463 10.4341ZM20.1517 16.4679C20.5422 16.8585 21.1753 16.8585 21.5659 16.4679C21.9564 16.0774 21.9564 15.4442 21.5659 15.0537L20.1517 16.4679ZM8 25V20.3804H6V25H8ZM7.70711 21.0875L20.2593 8.53535L18.845 7.12114L6.29289 19.6733L7.70711 21.0875ZM21.4582 8.53535L23.4646 10.5417L24.8788 9.12749L22.8725 7.12113L21.4582 8.53535ZM23.4646 11.7407L10.9125 24.2929L12.3267 25.7071L24.8788 13.1549L23.4646 11.7407ZM11.6196 24L6.99999 24L7.00001 26L11.6196 26L11.6196 24ZM23.4646 10.5417C23.7049 10.782 23.8421 10.9203 23.9346 11.0293C24.0196 11.1293 24.0066 11.1371 23.9924 11.0934L25.8945 10.4754C25.7946 10.1679 25.6245 9.92952 25.4593 9.73493C25.3017 9.54925 25.0958 9.3445 24.8788 9.12749L23.4646 10.5417ZM24.8788 13.1549C25.0959 12.9379 25.3017 12.7332 25.4593 12.5475C25.6245 12.3529 25.7947 12.1145 25.8945 11.8071L23.9924 11.189C24.0066 11.1453 24.0195 11.1531 23.9346 11.2531C23.8422 11.3621 23.705 11.5004 23.4646 11.7407L24.8788 13.1549ZM23.9924 11.0934C24.0025 11.1245 24.0025 11.1579 23.9924 11.189L25.8945 11.8071C26.0352 11.3743 26.0352 10.9082 25.8945 10.4754L23.9924 11.0934ZM20.2592 8.53535C20.4996 8.29501 20.6379 8.15783 20.7468 8.06536C20.8468 7.98046 20.8546 7.99339 20.8109 8.00758L20.1929 6.10547C19.8855 6.20534 19.6471 6.37544 19.4525 6.54065C19.2668 6.69828 19.0621 6.90411 18.845 7.12113L20.2592 8.53535ZM22.8725 7.12113C22.6555 6.90417 22.4508 6.69833 22.2652 6.54072C22.0706 6.37552 21.8322 6.20537 21.5247 6.10547L20.9067 8.00758C20.8629 7.99336 20.8707 7.98039 20.9707 8.06529C21.0796 8.15778 21.2179 8.29496 21.4582 8.53535L22.8725 7.12113ZM20.8109 8.00758C20.842 7.99747 20.8756 7.99747 20.9067 8.00758L21.5247 6.10547C21.0919 5.96484 20.6257 5.96484 20.1929 6.10547L20.8109 8.00758ZM15.5321 11.8483L20.1517 16.4679L21.5659 15.0537L16.9463 10.4341L15.5321 11.8483Z"
                      fill="black"
                    />
                  </Svg>
                </View>
              </Pressable>
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
                info={startDate}
                variant="primary"
                onPress={() => {
                  setStartDateVisible(true) + setBillingPeriodVisible(false);
                }}
              />
              <InfoBox
                title="Nästa betalning"
                info={nextPayment}
                variant="primary"
              />
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
                }}
                value={description}
                onChangeText={(text) =>
                  setDescription(text) + setDeleteConfirmationVisible(true)
                }
              />
              <View
                style={{ alignSelf: "flex-end", position: "absolute", top: 0 }}
              >
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
                variant={deleteConfirmationVisible ? "primary" : "disabled"}
                onPress={() => {
                  if (deleteConfirmationVisible === false) {
                    return;
                  } else {
                    updateData(targetDataKey);
                    navigation.navigate("SubscriptionScreen");
                  }
                }}
              />
            </View>
            <View style={{ marginBottom: 24 }}>
              <CTAButtonBig
                title="Ta bort prenumation"
                variant="red"
                onPress={() => {
                  setBillingPeriodVisible(false);
                  setStartDateVisible(false);

                  setDeleteVisible(true);
                }}
              />
            </View>
          </SafeAreaView>
        </BlurView>

        {plan === "" && (
          <View
            id="billingPeriod"
            style={{
              height: "64%",
              width: "94%",
              position: "absolute",
              alignSelf: "center",

              backgroundColor: "white",
              top: 0,
              display: billingPeriodVisible ? "flex" : "none",
              borderWidth: 2,
              borderColor: "black",
              borderRadius: 12,
              paddingVertical: 24,
              marginTop: "5%",
              gap: 12,
              paddingHorizontal: 12,
            }}
          >
            <Text
              style={{
                fontSize: 34,

                fontFamily: "Inter_600SemiBold",
                alignSelf: "center",
              }}
            >
              Faktureringsperiod
            </Text>
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
            <View style={{ marginBottom: 12, gap: 12 }}>
              <CTAButtonBig
                title="Spara"
                variant="primary"
                onPress={() => {
                  if (billingPeriod === "") {
                    alert("Du måste välja en faktureringsperiod");
                  } else {
                    setBillingPeriod(billingPeriod);
                    setBillingPeriodVisible(false);
                    setDeleteConfirmationVisible(true);
                  }
                }}
              />
              <CTAButtonBig
                title="Avbryt"
                variant="secondary"
                onPress={() => {
                  setBillingPeriodVisible(false);
                }}
              />
            </View>
          </View>
        )}

        <View
          style={{
            width: "94%",
            height: 224,
            position: "absolute",
            alignSelf: "center",

            display: deleteVisible ? "flex" : "none",
            backgroundColor: "white",
            borderRadius: 12,
            paddingVertical: 24,
            paddingHorizontal: 12,
            marginTop: "70%",
            borderWidth: 2,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Inter_600SemiBold",
              marginBottom: 12,
            }}
          >
            Är du säker?
          </Text>
          <Text style={{ fontSize: 16, fontFamily: "Inter_400Regular" }}>
            Genom att trycka “okej” raderas din prenumeration från tracky
            permanent. Raderingen går inte att ångra.
          </Text>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 24,
            }}
          >
            <CTAButtonSmall
              title="Tillbaka"
              variant="secondary"
              onPress={() => setDeleteVisible(false)}
            />
            <CTAButtonSmall
              title="Okej"
              variant="red"
              onPress={() => {
                deleteData(targetDataKey);
                navigation.navigate("SubscriptionScreen");
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View
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
            <Text
              style={{
                fontSize: 48,
                fontFamily: "Inter_600SemiBold",
                color: "white",
              }}
            >
              {name}
            </Text>
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
          <View style={{ gap: 12 }}>
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

                      setPlanVisible(false);
                      setLandingScreenVisible(true);
                    }}
                  />
                ))}
              </React.Fragment>
            )}
          </View>
        </View>
      </View>

      <View
        id="date"
        style={{
          height: "65%",
          width: "94%",
          position: "absolute",
          justifyContent: "center",
          alignSelf: "center",

          backgroundColor: "white",
          top: 0,
          display: startDateVisible ? "flex" : "none",
          borderWidth: 2,
          borderColor: "black",
          borderRadius: 12,
          paddingVertical: 24,
          marginTop: "28%",
          gap: 12,
          paddingHorizontal: 12,
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
        <View style={{ gap: 12, marginBottom: 12 }}>
          <CTAButtonBig
            title="Spara"
            variant="primary"
            onPress={() => {
              setStartDate(startDate);
              setStartDateVisible(false);
              setDeleteConfirmationVisible(true);
            }}
          />
          <CTAButtonBig
            title="Avbryt"
            variant="secondary"
            onPress={() => {
              setStartDateVisible(false);
            }}
          />
        </View>
      </View>
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
