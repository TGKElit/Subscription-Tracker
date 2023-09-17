import React, { FC } from "react";

import { Text, Image, StyleSheet, Pressable, ImageSourcePropType } from "react-native";


type CardType = "default" | "settings" | "transparent";

interface CardProps {
    variant: CardType,
    icon: ImageSourcePropType,
    title: string,
    info: string,
}

export const Card: FC<CardProps> = ({
    variant,
    icon,
    title,
    info,
}) => {
    
    const containerStyle =
        variant === "default" ? styles.defaultContainer : styles.settingsContainer;

    return (
        <Pressable style={[containerStyle, styles.container]}>
            <Image style={styles.icon} source={icon}/>
            <Text>{title}</Text>
            <Text>{info}</Text>
            <Image style={styles.icon} source={require('/assets/icons/icon=sideway-arrow.svg')} />
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
    backgroundColor: "white",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
});