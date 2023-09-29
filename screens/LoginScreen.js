import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { useState } from "react";
import { CTAButtonSmall } from "../src/Components/CTAButton/CTAButtonSmall";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (email === "" || password === "") {
      alert("Fyll i både e-post och lösenord.");
      return;
    }

    try {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigation.navigate("SubscriptionScreen");
          // ...
        })
        .catch((error) => {
          if (emailPattern.test(email) === false) {
            alert("Felaktig e-postadress format");
          } else if (
            error.code === "auth/user-not-found" ||
            error.code === "auth/wrong-password"
          ) {
            alert("Felaktig e-postadress eller lösenord.");
          } else {
            alert("Något gick fel. Försök igen senare.");
          }
        });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        alignContent: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#FFFFFF",
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
          Logga in
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
          Skriv i e-post och lösenord för att logga in
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
        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            marginTop: 12,
            flexDirection: "row",
          }}
        >
          <CTAButtonSmall
            title="Tillbaka"
            onPress={() => {
              navigation.navigate("Landing");
            }}
            variant="secondary"
          />
          <CTAButtonSmall title="Logga in" onPress={login} variant="primary" />
        </View>
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
    marginHorizontal: 24,
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
});
