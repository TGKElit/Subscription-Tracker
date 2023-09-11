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
    variant === "primary" ? styles.containerPrimary : styles.containerSecondary;

  const textStyle =
    variant === "primary" ? styles.textPrimary : styles.textSecondary;

  return (
    <Pressable onPress={onPress} style={containerStyle}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerPrimary: {
    height: 46,
    width: 366,
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
    width: 366,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 12,
  },
  textPrimary: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  textSecondary: {
    fontSize: 16,
    fontWeight: "700",
    color: "black",
  },
});
