import React, { FC } from "react";

import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";


type CardType = "default" | "settings" | "transparent";

interface CardProps {
    variant: CardType,
    icon: string,
    title: string,
}

export const Card: FC<CardProps> = ({
    icon,
    title,
}) => {
    
    return (
        <TouchableOpacity>
            <Text>{title}</Text>
            <Image style={styles.icon} source={require('/assets/icons/icon=sideway-arrow.svg')} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  }
});