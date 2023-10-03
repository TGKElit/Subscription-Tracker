// import React, { FC } from "react";
// import { View, StyleSheet, Pressable, Text, TextInput } from "react-native";
// import Svg, { Path } from "react-native-svg";
// import { ScrollView } from "react-native";
// import { Image } from "expo-image";
// import { Card } from "../Card/Card";

// const colorsPicture = {
//   Netflix: {
//     color: "#E60000",
//     picture: require("../assets/logoImages/netflix.png"),
//   },
//   "HBO Max": {
//     color: "#9C00AF",
//     picture: require("../assets/logoImages/hbo.png"),
//   },
//   "Amazon Prime": {
//     color: "#0097EC",
//     picture: require("../assets/logoImages/prime.png"),
//   },
//   Spotify: {
//     color: "#00863F",
//     picture: require("../assets/logoImages/spotify.png"),
//   },
//   Storytel: {
//     color: "#FF3D00",
//     picture: require("../assets/logoImages/storytel.png"),
//   },
//   "Disney+": {
//     color: "#0097EC",
//     picture: require("../assets/logoImages/disney.png"),
//   },
//   GP: {
//     color: "#4443BC",
//     picture: require("../assets/logoImages/gp.png"),
//   },
// };

// interface PresetplanProps {
//   planVisible: boolean;
//  name: string;
// }

// export const Presetplan: FC<PresetplanProps> = ({ planVisible, name }) => {
//   return (
//     <ScrollView
//       id="presetPlan"
//       style={{
//         paddingHorizontal: 12,
//         display: planVisible ? "flex" : "none",
//       }}
//     >
//       {colorsPicture[name] && (
//         <View
//           style={{
//             width: "100%",
//             height: 200,
//             backgroundColor: colorsPicture[name].color,
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: 12,
//             marginVertical: 24,
//           }}
//         >
//           <Image
//             style={{ width: 64, height: 64, borderRadius: 12 }}
//             source={colorsPicture[name].picture}
//           />
//         </View>
//       )}
//       <View>
//         <Text
//           style={{
//             fontSize: 24,
//             fontFamily: "Inter_600SemiBold",
//             lineHeight: 28,
//             marginBottom: 12,
//           }}
//         >
//           Välj plan
//         </Text>
//         {/* <View style={{ gap: 12, marginBottom: 110 }}>
//           {plans[name] && (
//             <React.Fragment>
//               {Object.keys(plans[name]).map((key) => (
//                 <Card
//                   key={key}
//                   variant="basic"
//                   title={key}
//                   onPress={() => {
//                     setPlan(key);
//                     setPrice(plans[name][key].price);
//                     setBillingPeriod(plans[name][key].billingPeriod);
//                     setDescription("");
//                     setStartDate("");
//                     isStateUpdated.current = true;
//                   }}
//                 />
//               ))}
//             </React.Fragment>
//           )}
//         </View> */}
//       </View>
//     </ScrollView>
//   );
// };
