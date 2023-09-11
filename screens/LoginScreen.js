import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { useState } from "react";
import { startFirebaseApp } from "../firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  startFirebaseApp();

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={{ fontSize: 36, marginBottom: 10 }}>Logga in</Text>
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
          onPress={() => {}}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
});
