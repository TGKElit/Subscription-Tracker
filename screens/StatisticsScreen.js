import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderContainer } from "../src/Components/HeaderContainer/HeaderContainer";
import { Navbar } from "../src/Components/Navbar/Navbar";
import { Text } from "react-native";
import Svg, { Path } from "react-native-svg";

const StatisticsScreen = ({navigation}) => {
  const monthlyCosts = 2;
  const yearlyCosts = 3;
  const totalCost = 27;
  return (
    <SafeAreaView style={styles.body}>
      <HeaderContainer title="Statistik" />
      <View style={styles.torso}>
        <View style={styles.titleBox}>
          <Text style={styles.boxTitle}> Subscription Overview</Text>
          <Svg style={styles.illustration} width="187" height="132" viewBox="0 0 187 132" fill="none">
            <Path d="M28.5571 91.2955C28.5571 87.8894 31.3183 85.1282 34.7245 85.1282H48.9094C52.3155 85.1282 55.0767 87.8894 55.0767 91.2955V132H28.5571V91.2955Z" fill="#0097EC"/>
            <Path d="M62.4775 74.027C62.4775 70.6208 65.2388 67.8596 68.6449 67.8596H82.8298C86.2359 67.8596 88.9972 70.6208 88.9972 74.027V132H62.4775V74.027Z" fill="#9C00AF"/>
            <Path d="M96.3979 83.8946C96.3979 80.4885 99.1592 77.7273 102.565 77.7273H116.75C120.156 77.7273 122.918 80.4885 122.918 83.8946V132H96.3979V83.8946Z" fill="#FC9100"/>
            <Path d="M130.318 99.9298C130.318 96.5237 133.08 93.7625 136.486 93.7625H150.671C154.077 93.7625 156.838 96.5237 156.838 99.9298V132H130.318V99.9298Z" fill="#E60000"/>
            <Path d="M186.532 99.095C186.922 98.7044 186.922 98.0713 186.532 97.6807L180.168 91.3168C179.777 90.9262 179.144 90.9262 178.754 91.3167C178.363 91.7073 178.363 92.3404 178.754 92.731L184.41 98.3878L178.754 104.045C178.363 104.435 178.363 105.068 178.753 105.459C179.144 105.849 179.777 105.849 180.168 105.459L186.532 99.095ZM6.05264 117.57C18.6384 86.1055 34.2982 69.3802 51.0284 61.8329C67.7638 54.2832 85.7762 55.8238 103.267 61.3354C120.767 66.8495 137.619 76.2972 151.98 84.4181C159.142 88.4684 165.703 92.1986 171.38 94.9126C177.021 97.6098 181.954 99.3878 185.825 99.3878L185.825 97.3878C182.448 97.3878 177.878 95.8027 172.243 93.1082C166.642 90.4307 160.15 86.7408 152.964 82.6772C138.628 74.5703 121.599 65.0149 103.868 59.4278C86.1298 53.8382 67.5634 52.1796 50.2059 60.0098C32.8433 67.8424 16.8961 85.0761 4.19569 116.827L6.05264 117.57Z" fill="#00863F"/>
            <Path d="M119.565 25C121.14 25 122.417 26.277 122.417 27.8522V28.5652C122.417 30.1404 121.14 31.4174 119.565 31.4174H118.852C117.277 31.4174 116 30.1404 116 28.5652V27.8522C116 26.277 117.277 25 118.852 25H119.565Z" fill="#0097EC"/>
            <Path d="M153.87 25C155.445 25 156.722 26.277 156.722 27.8522V28.5652C156.722 30.1404 155.445 31.4174 153.87 31.4174L129.27 31.4174C127.694 31.4174 126.417 30.1404 126.417 28.5652V27.8522C126.417 26.277 127.694 25 129.27 25L153.87 25Z" fill="#0097EC"/>
            <Path d="M119.565 35.4175C121.14 35.4175 122.417 36.6944 122.417 38.2697V38.9827C122.417 40.5579 121.14 41.8349 119.565 41.8349H118.852C117.277 41.8349 116 40.5579 116 38.9827V38.2697C116 36.6944 117.277 35.4175 118.852 35.4175H119.565Z" fill="#0097EC"/>
            <Path d="M153.87 35.4175C155.445 35.4175 156.722 36.6944 156.722 38.2697V38.9827C156.722 40.5579 155.445 41.8349 153.87 41.8349L129.27 41.8349C127.694 41.8349 126.417 40.5579 126.417 38.9827V38.2697C126.417 36.6944 127.694 35.4175 129.27 35.4175L153.87 35.4175Z" fill="#0097EC"/>
            <Path d="M119.565 45.8347C121.14 45.8347 122.417 47.1117 122.417 48.6869V49.3999C122.417 50.9751 121.14 52.2521 119.565 52.2521H118.852C117.277 52.2521 116 50.9751 116 49.3999V48.6869C116 47.1117 117.277 45.8347 118.852 45.8347H119.565Z" fill="#0097EC"/>
            <Path d="M153.87 45.8347C155.445 45.8347 156.722 47.1117 156.722 48.6869V49.3999C156.722 50.9751 155.445 52.2521 153.87 52.2521L129.27 52.2521C127.694 52.2521 126.417 50.9751 126.417 49.3999V48.6869C126.417 47.1117 127.694 45.8347 129.27 45.8347L153.87 45.8347Z" fill="#0097EC"/>
            <Path fillRule="evenodd" clipRule="evenodd" d="M50.2667 29.0797L36.5256 21.1462V27.6302C28.2473 29.8256 22.1464 37.3696 22.1464 46.3386C22.1464 53.4431 25.9745 59.6535 31.6805 63.0197L31.6289 63.0495L46.319 71.5309V65.0875C54.6762 62.9458 60.8536 55.3636 60.8536 46.3386C60.8536 38.8054 56.5497 32.2775 50.2667 29.0797ZM30.8516 48.9035C29.478 48.9035 28.3644 50.0171 28.3644 51.3907C28.3644 52.7644 29.478 53.8779 30.8516 53.8779H51.9929C53.3666 53.8779 54.4801 52.7644 54.4801 51.3907C54.4801 50.0171 53.3666 48.9035 51.9929 48.9035H30.8516ZM28.3644 41.4418C28.3644 40.0682 29.478 38.9546 30.8516 38.9546H51.9929C53.3666 38.9546 54.4801 40.0682 54.4801 41.4418C54.4801 42.8155 53.3666 43.9291 51.9929 43.9291H30.8516C29.478 43.9291 28.3644 42.8155 28.3644 41.4418Z" fill="#EA0059"/>
          </Svg>
        </View>
        <Text style={styles.title}>Statistik</Text>
        <View style={styles.box}>
          <Text style={styles.description}>Pris för dina månliga prenumerationer</Text>
          <Text style={styles.cost}>
            {monthlyCosts}kr <Text style={styles.period}>/månad</Text>
            </Text>
          
        </View>
        <View style={styles.box}>
          <Text style={styles.description}>Pris för dina årliga prenumerationer</Text>
          <Text style={styles.cost}>
            {yearlyCosts}kr <Text style={styles.period}>/år</Text>
          </Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.description}>Totala kostnaden per år</Text>
          <Text style={styles.cost}>
            {totalCost}kr <Text style={styles.period}>/år</Text>
          </Text>
          
        </View>
      </View>
      <Navbar navigation={navigation} screen="statistics"/>
    </SafeAreaView>
  );
};
export default StatisticsScreen;

const styles = StyleSheet.create({
  body: {
    height: "100%",
    backgroundColor: "white",
  },

  torso: {
    display: "flex",
    gap: 12,
    padding: 12,
  },

  titleBox: {
    width: "100%",
    height: 134,
    paddingLeft: 12,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    zIndex: 100,

    borderWidth: 2,
    borderColor: "#7D7D7D",
    borderRadius: 12,
  },
  
  boxTitle: {
    marginTop: 24,
    fontFamily: "Inter_400Regular",
    fontSize: 16,
  },

  illustration: {
    zIndex: 0,
  },

  box: {
    width: "100%",
    height: 134,
    padding: 12,

    borderWidth: 2,
    borderColor: "#7D7D7D",
    borderRadius: 12,
  },


  title: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 24,
  },

  description: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    opacity: 0.7,
  },

  cost: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 24,
  },

  period: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
  },
});