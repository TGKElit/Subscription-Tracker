import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Modal,
} from "react-native";

import React from "react";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { CTAButtonSmall } from "../src/Components/CTAButton/CTAButtonSmall";
import { CTAButtonBig } from "../src/Components/CTAButton/CTAButtonBig";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [boxState, setBoxState] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    console.log("Box state:", boxState);
  }, [boxState]);

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
    <KeyboardAvoidingView
      style={{
        alignContent: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 36,
            marginBottom: 64,
            fontFamily: "Inter_600SemiBold",
          }}
        >
          Registrera
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
            {boxState ? (
              <Text style={{ fontSize: 24, color: "black" }}>✓</Text>
            ) : null}
          </Pressable>
          <Text
            style={{
              marginLeft: 8,
              fontFamily: "Inter_400Regular",
              lineHeight: 16,
              fontSize: 12,
            }}
          >
            Genom att kryssa samtycker jag till{" "}
          </Text>
          <Text
            onPress={() => setModalVisible(true)}
            style={{
              textDecorationLine: "underline",
              fontSize: 12,
              lineHeight: 16,
              fontFamily: "Inter_600SemiBold",
            }}
          >
            Villkoren
          </Text>
        </View>
        {/* få registreringsknappen till vänster */}
        <View style={{ alignSelf: "flex-start", marginTop: 12 }}>
          <CTAButtonSmall
            title="Registrera"
            onPress={createAccount}
            variant="primary"
          />
        </View>
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.termsOfSeriveContainer}>
            <View style={styles.modalView}>
              <Text style={styles.termsOfServiceHeader}>
                Villkor for tjänsten
              </Text>
              <View style={styles.termsOfServiceTextContainer}>
                <Text>
                  Lorem ipsum dolor sit amet consectetur. Donec augue elit
                  praesent faucibus quisque malesuada vitae pellentesque
                  aliquam. Lorem ipsum dolor sit amet consectetur. Donec augue
                  elit praesent faucibus quisque malesuada vitae pellentesque
                  aliquam.
                </Text>
              </View>
              <View style={styles.termsOfServiceButtonContainer}>
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
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
  },
  inputContainer: {
    width: "100%",
    gap: 8,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 5,
    borderWidth: 2,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
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

  termsOfSeriveContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
    backgroundColor: "white",
    paddingVertical: 24,
    paddingHorizontal: 12,
    gap: 24,
    borderRadius: 12,
  },
  modalView: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  termsOfServiceHeader: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28,
    fontStyle: "normal",
  },
  termsOfServiceTextContainer: {
    marginTop: 20,
    height: "20vh",
    width: "100%",
  },

  // gör spacebetween
  termsOfServiceButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  termsOfServiceButton: {
    width: 126,
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 12,
    borderColor: "black",
    borderWidth: 2,
  },

  denyButton: {
    backgroundColor: "white",
  },
  acceptButton: {
    backgroundColor: "black",
  },

  textBlack: {
    color: "black",
  },
  textWhite: {
    color: "white",
  },
});
