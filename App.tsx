import { StyleSheet, Text, TextInput, View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SubscriptionScreen from "./screens/SubscriptionScreen";
import SettingsScreen from "./screens/SettingsScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { startFirebaseApp } from "./firebaseConfig";
import LandingScreen from "./screens/LandingScreen";

const Stack = createStackNavigator();

function App() {
  startFirebaseApp();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Landing"
          component={LandingScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Settings"
          component={SettingsScreen}
        />
        <Stack.Screen
          name="SubscriptionScreen"
          component={SubscriptionScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
