import { View } from "react-native";
import React, { FC } from "react";
import { Text, StyleSheet } from "react-native";

// type HeaderType = "primary" | "secondary";
interface HeaderProps {
  title: string;
}

export const HeaderContainer: FC<HeaderProps> = ({ title }) => {
  // const containerStyle =
  //   variant === "primary" ? styles.containerPrimary : styles.containerSecondary;

  // const textStyle =
  //   variant === "primary" ? styles.textPrimary : styles.textSecondary;

  return (
    <View
      style={{
        width: "100%",
        height: 104,
        flex: 1,
        justifyContent: "center",
        borderBottomEndRadius: 8,
        borderWidth: 2,
        alignItems: "center",
      }}
    >
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: "Inter_600SemiBold",
    color: "black",
  },
});
