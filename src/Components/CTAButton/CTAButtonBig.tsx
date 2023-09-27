import React, { FC } from "react";

import { TouchableOpacity, Text, StyleSheet, Pressable } from "react-native";

type ButtonType = "primary" | "secondary";

interface CTAButtonProps {
  title: string;
  variant: ButtonType;
  onPress: () => void;
}

export const CTAButtonBig: FC<CTAButtonProps> = ({
  title,
  onPress,
  variant,
}) => {
  const containerStyle =
    variant === "primary"
      ? styles.containerPrimary
      : variant === "secondary"
      ? styles.containerSecondary
      : styles.containerRed;

  const textStyle =
    variant === "primary"
      ? styles.textPrimary
      : variant === "secondary"
      ? styles.textSecondary
      : styles.textRed;
  return (
    <Pressable onPress={onPress} style={containerStyle}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerPrimary: {
    height: 46,
    width: "100%",
    backgroundColor: "black",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    borderStyle: "solid",
  },
  containerSecondary: {
    height: 46,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 12,
  },
  containerRed: {
    height: 46,
    width: "100%",
    backgroundColor: "#E60000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  textPrimary: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "white",
  },
  textSecondary: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "black",
  },

  textRed: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "white",
  },
});
