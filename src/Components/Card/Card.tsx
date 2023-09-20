import React, { FC } from "react";

import { Text, StyleSheet, Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";
import { CardIcon } from "../CardIcon/CardIcon";

type CardType = "default" | "settings" | "transparent";
type IconType = "terms" | "help" | "prime" | "disney" | "gp" | "hbo" | "spotify" | "storytel" | "letter";

interface CardProps {
    variant: CardType,
    title: string,
    info: string,
    icon: IconType,
    color: string,
}

export const Card: FC<CardProps> = ({
    variant,
    icon,
    title,
    info,
    color,
}) => {

    const containerStyle =
         variant === "default" ? styles.defaultContainer : styles.settingsContainer;

    return (
        <Pressable style={[containerStyle, styles.container]}>
            <CardIcon icon={icon} letter={title.charAt(0)} color={color}></CardIcon>
            <Text>{title}</Text>
            <Text>{info}</Text>
            <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <Path d="M11.5 25L20.5 16L11.5 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>

        </Pressable>
    )
}

const styles = StyleSheet.create({

  icon: {
    width: 32,
    height: 32,
  },

  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  defaultContainer: {
    backgroundColor: "gray",
    borderRadius: 12,
  },

  settingsContainer: {
    backgroundColor: "cyan",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
});
