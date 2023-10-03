import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Modal,
} from "react-native";
import Svg, { Circle, Rect, Path } from "react-native-svg";

import React from "react";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { CTAButtonSmall } from "../src/Components/CTAButton/CTAButtonSmall";
import { BlurView } from "expo-blur";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [boxState, setBoxState] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleBox = () => {
    setBoxState(!boxState);
  };

  const createAccount = async () => {
    // Email validation regex pattern
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (boxState && email !== "" && password !== "") {
      // Check if the email matches the pattern
      if (!emailPattern.test(email)) {
        alert("Ange en giltig e-postadress.");
        return; // Exit the function if the email is not valid
      }

      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("Registered with:", user.email);
        navigation.navigate("SubscriptionScreen");
      } catch (error) {
        alert(error.message);
      }
    } else if (!boxState) {
      alert("Du måste godkänna villkoren.");
    } else if (email === "" || password === "") {
      alert("Fyll i både e-post och lösenord.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.keyboardView}>
      <BlurView
        style={styles.container}
        tint="dark"
        intensity={modalVisible ? 100 : 0}
      >
        <Text style={styles.title}>Registrera</Text>
        <Text style={styles.descriptionText}>
          Skriv i e-post och lösenord för att registrera
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="E-post"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Lösenord"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.checkBoxContainer}>
          <Pressable onPress={toggleBox} style={[styles.checkBox]}>
            {boxState ? <Text style={styles.checkMark}>✓</Text> : null}
          </Pressable>
          <Text style={styles.condintionsText}>
            Genom att kryssa samtycker jag till{" "}
          </Text>
          <Text
            onPress={() => setModalVisible(true)}
            style={styles.conditionTextUnderine}
          >
            Villkoren
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <CTAButtonSmall
            title="Tillbaka"
            onPress={() => {
              navigation.navigate("Landing");
            }}
            variant="secondary"
          />
          <CTAButtonSmall
            title="Registrera"
            onPress={createAccount}
            variant="primary"
          />
        </View>
      </BlurView>

      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <Path
                  d="M7 20.7273C6.44772 20.7273 6 21.175 6 21.7273C6 22.2796 6.44772 22.7273 7 22.7273V20.7273ZM14.875 22.7273C15.4273 22.7273 15.875 22.2796 15.875 21.7273C15.875 21.175 15.4273 20.7273 14.875 20.7273V22.7273ZM25.7493 18.5714C26.115 18.1576 26.0761 17.5256 25.6623 17.1598C25.2485 16.7941 24.6165 16.833 24.2507 17.2468L25.7493 18.5714ZM20.5 23L19.7507 23.6623C19.9406 23.877 20.2134 24 20.5 24C20.7866 24 21.0594 23.877 21.2493 23.6623L20.5 23ZM18.9993 19.7923C18.6335 19.3785 18.0015 19.3395 17.5877 19.7053C17.1739 20.0711 17.135 20.703 17.5007 21.1168L18.9993 19.7923ZM7 14.3636C6.44772 14.3636 6 14.8114 6 15.3636C6 15.9159 6.44772 16.3636 7 16.3636V14.3636ZM19.375 16.3636C19.9273 16.3636 20.375 15.9159 20.375 15.3636C20.375 14.8114 19.9273 14.3636 19.375 14.3636V16.3636ZM7 8C6.44772 8 6 8.44772 6 9C6 9.55228 6.44772 10 7 10V8ZM19.375 10C19.9273 10 20.375 9.55228 20.375 9C20.375 8.44772 19.9273 8 19.375 8V10ZM7 22.7273H14.875V20.7273H7V22.7273ZM24.2507 17.2468L19.7507 22.3377L21.2493 23.6623L25.7493 18.5714L24.2507 17.2468ZM21.2493 22.3377L18.9993 19.7923L17.5007 21.1168L19.7507 23.6623L21.2493 22.3377ZM7 16.3636H19.375V14.3636H7V16.3636ZM7 10H19.375V8H7V10Z"
                  fill="black"
                />
              </Svg>
              <Text style={styles.modalTitle}>Villkor for tjänsten</Text>
            </View>
            <View>
              <Text style={styles.modalText}>
                Lorem ipsum dolor sit amet consecte. Donec augue elit praesent
                faucibus quisque malesuada vitae pellentesque aliquam. Lorem
                ipsum dolor sit amet consectetur. Donec augue elit praesent
                faucibus quisque malesuada vitae pellentesque aliquam.
              </Text>
            </View>
            <View style={styles.modalButtonContainer}>
              <CTAButtonSmall
                title="Avböj"
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setBoxState(false);
                }}
                variant="secondary"
              />
              <CTAButtonSmall
                title="Acceptera"
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setBoxState(true);
                }}
                variant="primary"
              />
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  keyboardView: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 36,
    marginBottom: 64,
    fontFamily: "Inter_600SemiBold",
  },
  descriptionText: {
    fontSize: 12,
    marginBottom: 8,
    fontFamily: "Inter_400Regular",
    lineHeight: 16,
    alignSelf: "flex-start",
  },
  condintionsText: {
    marginLeft: 8,
    fontFamily: "Inter_400Regular",
    lineHeight: 16,
    fontSize: 12,
  },

  conditionTextUnderine: {
    textDecorationLine: "underline",
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "Inter_600SemiBold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  inputContainer: {
    width: "100%",
    gap: 8,
    marginBottom: 8,
  },
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
  buttonContainer: {
    width: "100%",
    justifyContent: "space-between",
    marginTop: 12,
    flexDirection: "row",
  },

  checkBox: {
    height: 32,
    width: 32,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  checkMark: {
    fontSize: 24,
    color: "black",
    paddingLeft: 4,
  },
  modalView: {
    width: "87%",
    height: 340,
    paddingHorizontal: 12,
    paddingVertical: 24,
    backgroundColor: "white",
    borderWidth: 2,
    alignSelf: "center",
    marginTop: "45%",
    borderRadius: 12,
  },
  modalTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  modalText: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
  },
  modalButtonContainer: {
    marginHorizontal: 12,
    position: "absolute",
    marginBottom: 24,
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
