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
import { startFirebaseApp } from "../firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const RegisterScreen = () => {
  startFirebaseApp();
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
    if (boxState === true) {
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("Registered with:", user.email);
      } catch (error) {
        // alert(error.message);
      }
    } else {
      alert("Du måste godkänna villkoren");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={{ fontSize: 36, marginBottom: 10 }}>Registrera</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        Skriv i email och lösenord för att registrera
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={createAccount}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </View>
      <View style={styles.checkBoxContainer}>
        <Pressable onPress={toggleBox} style={[styles.checkBox]}>
          {boxState ? (
            <Text style={{ fontSize: 24, color: "black" }}>✓</Text>
          ) : null}
        </Pressable>
        <Text>Genom att kryssa samtycker jag till </Text>
        <Text
          onPress={() => setModalVisible(true)}
          style={{ textDecorationLine: "underline" }}
        >
          villkoren
        </Text>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
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
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "#fff",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontSize: 16,
    fontWeight: "700",
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
  },

  termsOfSeriveContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
