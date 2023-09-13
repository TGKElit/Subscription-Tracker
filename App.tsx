import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SubscriptionScreen from "./screens/SubscriptionScreen";
import SettingsScreen from "./screens/SettingsScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { startFirebaseApp } from "./firebaseConfig";
import LandingScreen from "./screens/LandingScreen";
import {
  useFonts,
  Inter_600SemiBold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";

const Stack = createStackNavigator();

function App() {
  let [fontsLoaded, fontError] = useFonts({
    Inter_600SemiBold,
    Inter_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
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
