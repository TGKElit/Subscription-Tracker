import { Pressable, View } from "react-native";
import React, { FC } from "react";
import { Text, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { AuthErrorCodes } from "firebase/auth";

// type HeaderType = "primary" | "secondary";
interface HeaderProps {
  title: string;
  navigation: any;
  backArrow: () => void;
  addSubscription: boolean;
}

export const HeaderContainer: FC<HeaderProps> = ({
  title,
  navigation,
  backArrow,
  addSubscription,
}) => {
  // const containerStyle =
  //   variant === "primary" ? styles.containerPrimary : styles.containerSecondary;

  // const textStyle =
  //   variant === "primary" ? styles.textPrimary : styles.textSecondary;

  return (
    <View style={styles.box}>
      {backArrow && (
        <Pressable style={styles.backArrow} onPress={backArrow}>
          <Svg width="28" height="28" viewBox="10 3 28 28" fill="none">
            <Path
              d="M20.5 7L11.5 16L20.5 25"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>
      )}
      <Text style={styles.textStyle}>{title}</Text>
      {addSubscription && (
        <Pressable
          style={styles.plus}
          onPress={() => navigation.navigate("AddSubscription")}
        >
          <Svg width="18" height="24" viewBox="0 2 18 18" fill="none">
            <Path
              id="subtract"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM8.1 4.95C8.1 4.45294 8.50294 4.05 9 4.05C9.49706 4.05 9.9 4.45294 9.9 4.95V8.1H13.05C13.5471 8.1 13.95 8.50294 13.95 9C13.95 9.49706 13.5471 9.9 13.05 9.9H9.9V13.05C9.9 13.5471 9.49706 13.95 9 13.95C8.50294 13.95 8.1 13.5471 8.1 13.05V9.9H4.95C4.45294 9.9 4.05 9.49706 4.05 9C4.05 8.50294 4.45294 8.1 4.95 8.1H8.1V4.95Z"
              fill="#EA0059"
            />
          </Svg>
        </Pressable>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: 68,
    backgroundColor: "white",
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderColor: "#7D7D7D",
    borderWidth: 2,
    borderTopWidth: 0,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 20,
  },

  backArrow: {
    position: "absolute",
    left: 20,
    bottom: 20,
  },

  plus: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },

  textStyle: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: "Inter_600SemiBold",
    color: "black",
  },
});
