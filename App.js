import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";

const name = "Adam";

const myFunction = (input) => {
  return `Hello ${name}`;
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ color: "red" }}>Hello World!</Text>
      <TextInput></TextInput>
      <Text>
        Open up App.js to start working on your app! TESTING TESTING Hallå ADAM!
        Funkar detta fortfarande?
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
