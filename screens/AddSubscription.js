import { View, Text, SafeAreaView } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AddSubscriptionScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return (
    <SafeAreaView>
      <View>
        <Text>Welcome {user.email} </Text>
        <Text>Hej du har nått add subscriton sidan</Text>
      </View>
    </SafeAreaView>
  );
};

export default AddSubscriptionScreen;
