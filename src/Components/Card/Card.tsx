import React, { FC } from "react";

import { Text, StyleSheet, Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";
import { CardIcon } from "../CardIcon/CardIcon";
import { AuthErrorCodes } from "firebase/auth";

type CardType = "default" | "settings" | "basic";
type IconType =
  | "terms"
  | "help"
  | "prime"
  | "disney"
  | "gp"
  | "hbo"
  | "spotify"
  | "storytel"
  | "default"
  | "plus";

interface CardProps {
  variant: CardType;
  title: string;
  info: string;
  icon: IconType;
  iconColor: string;
  color: string;
  onPress: () => void;
}

export const Card: FC<CardProps> = ({
  variant,
  icon,
  title,
  info,
  iconColor,
  color,
  onPress,
}) => {

  const containerStyle =
    variant === "default"
      ? styles(color).defaultContainer
      : variant === "settings"
      ? styles(color).settingsContainer
      : styles(color).basicContainer;

  const titleStyle =
    variant === "default"
      ? styles(color).defaultTitle
      : variant === "settings"
      ? styles(color).settingsTitle
      : styles(color).basicTitle;

  const infoStyle =
  variant === "default"
    ? styles(color).defaultInfo
    : variant === "settings"
    ? styles(color).settingsInfo
    : styles(color).basicInfo;

  const arrowColor =
    variant === "default"
    ? "white"
    : "black"

  const basicSize =
    icon && variant === "basic"
    ? styles(color).largeBasic
    : null;

  return (
    <Pressable
      onPress={onPress}
      style={[containerStyle, styles(color).container, basicSize]}
    >
      <CardIcon
        icon={icon}
        letter={title.charAt(0)}
        color={iconColor}
      ></CardIcon>
      <Text style={[titleStyle, styles(color).title]}>{title}</Text>
      <Text style={[infoStyle, styles(color).info]}>{info}</Text>
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <Path
          d="M11.5 25L20.5 16L11.5 7"
          stroke={arrowColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  );
};

const styles = (color: string) =>
  StyleSheet.create({
    container: {
      
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      paddingRight: 16,
    },

    defaultContainer: {
      height: 64,
      backgroundColor: color,
      borderRadius: 12,
    },

    settingsContainer: {
      height: 56,
      backgroundColor: "white",
      borderBottomColor: "#7D7D7D",
      borderBottomWidth: 2,
    },

    basicContainer: {
      borderRadius: 12,
      borderWidth: 2,
      borderColor: "#7D7D7D",
      height: 56,
    },

    largeBasic: {
      height: 64,
    },

    title: {
      marginRight: "auto",
      fontFamily: "Inter_600SemiBold",
      
    },

    defaultTitle: {
      fontSize: 20,
      color: "white",
    },

    settingsTitle: {
      fontSize: 16,
      color: "black",
    },

    basicTitle: {
      fontSize: 20,
      color: "black"
    },

    info: {
      marginRight: 8,
      fontFamily: "Inter_400Regular",
      fontSize: 16,
    },

    defaultInfo: {
      color: "white",
    },

    settingsInfo: {
      color: "black",
    },

    basicInfo: {
      color: "black",
    },
  });
