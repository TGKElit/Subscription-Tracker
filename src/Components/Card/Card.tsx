import React, { FC } from "react";

import { Text, StyleSheet, Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";
import { CardIcon } from "../CardIcon/CardIcon";
import { AuthErrorCodes } from "firebase/auth";

type CardType = "default" | "settings" | "basic";
type IconType = "terms" | "help" | "prime" | "disney" | "gp" | "hbo" | "spotify" | "storytel" | "default" | "plus";

interface CardProps {
    variant: CardType,
    title: string,
    info: string,
    icon: IconType,
    iconColor: string,
    color: string,
}

export const Card: FC<CardProps> = ({
    variant,
    icon,
    title,
    info,
    iconColor,
    color,
}) => {

    const containerStyle =
         variant === "default" ? styles(color).defaultContainer : variant === "settings" ? styles(color).settingsContainer : styles(color).basicContainer;

    return (
        <Pressable style={[containerStyle, styles(color).container]}>
            <CardIcon icon={icon} letter={title.charAt(0)} color={iconColor}></CardIcon>
            <Text style={styles(color).title}>{title}</Text>
            <Text style={styles(color).info}>{info}</Text>
            <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <Path d="M11.5 25L20.5 16L11.5 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>

        </Pressable>
    )
}

const styles = (color: string) => StyleSheet.create({

  container: {
    height: 64,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    paddingRight: 16,
  },

  defaultContainer: {
    backgroundColor: color,
    borderRadius: 12,
  },

  settingsContainer: {
    backgroundColor: "white",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },

  basicContainer: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#7D7D7D",
  },

  title: {
    marginRight: "auto",
  },

  info: {
    margin: 8,
  }

});
