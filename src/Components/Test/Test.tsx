import React from "react";
import { useState } from "react";
import { StyleSheet, View, Text, Alert, TextInput } from "react-native";
import db from "@react-native-firebase/database";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import auth from "@react-native-firebase/auth";
import { CTAButton } from "../CTAButton/CTAButton";

export const Test = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const createProfile = async (response: FirebaseAuthTypes.UserCredential) => {
  //   // Create Profile Query Here
  //   db().ref(`/users/${response.user.uid}`).set({ name });
  // };

  // const registerAndGoToMainFlow = async () => {
  //   // Register User Query Here
  //   if (email && password) {
  //     try {
  //       const response = await auth().createUserWithEmailAndPassword(
  //         email,
  //         password
  //       );

  //       if (response.user) {
  //         await createProfile(response);
  //       }
  //     } catch (error) {
  //       Alert.alert("woops", "please check your form and try again!");
  //     }
  //   }
  // };
  return (
    <View>
      <Text>Register</Text>
      <CTAButton
        title="Sign Up"
        onPress={() => console.log("pressed")}
        variant="primary"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    marginHorizontal: 50,
    backgroundColor: "white",
    paddingTop: 20,
  },
  titleContainer: {
    flex: 1.2,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 45,
    textAlign: "center",
    fontWeight: "200",
  },
  loginTextField: {
    borderBottomWidth: 1,
    height: 60,
    fontSize: 30,
    marginVertical: 10,
    fontWeight: "300",
  },
  mainContent: {
    flex: 6,
  },
});
