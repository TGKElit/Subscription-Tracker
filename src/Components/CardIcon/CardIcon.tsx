import React, { FC } from "react";
import { Image, StyleSheet } from "react-native";
import Svg, { Path, Rect, Text } from "react-native-svg";

interface CardIconProps {
    letter: string,
    icon: string,
    color: string,
}

export const CardIcon: FC<CardIconProps> = ({
    letter,
    color,
    icon,
}) => {
    let cardIcon;
    switch (icon) {
        case "default":
            cardIcon =
                <Svg width="40" height="40" viewBox="0 0 40 40" fill={color}>
                    <Rect width="40" height="40" rx="12" fill="color"/>
                    <Text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white">{letter}</Text>
                </Svg>
            break;
        case "terms":
            cardIcon =
                <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <Path d="M7 20.7273C6.44772 20.7273 6 21.175 6 21.7273C6 22.2796 6.44772 22.7273 7 22.7273V20.7273ZM14.875 22.7273C15.4273 22.7273 15.875 22.2796 15.875 21.7273C15.875 21.175 15.4273 20.7273 14.875 20.7273V22.7273ZM25.7493 18.5714C26.115 18.1576 26.0761 17.5256 25.6623 17.1598C25.2485 16.7941 24.6165 16.833 24.2507 17.2468L25.7493 18.5714ZM20.5 23L19.7507 23.6623C19.9406 23.877 20.2134 24 20.5 24C20.7866 24 21.0594 23.877 21.2493 23.6623L20.5 23ZM18.9993 19.7923C18.6335 19.3785 18.0015 19.3395 17.5877 19.7053C17.1739 20.0711 17.135 20.703 17.5007 21.1168L18.9993 19.7923ZM7 14.3636C6.44772 14.3636 6 14.8114 6 15.3636C6 15.9159 6.44772 16.3636 7 16.3636V14.3636ZM19.375 16.3636C19.9273 16.3636 20.375 15.9159 20.375 15.3636C20.375 14.8114 19.9273 14.3636 19.375 14.3636V16.3636ZM7 8C6.44772 8 6 8.44772 6 9C6 9.55228 6.44772 10 7 10V8ZM19.375 10C19.9273 10 20.375 9.55228 20.375 9C20.375 8.44772 19.9273 8 19.375 8V10ZM7 22.7273H14.875V20.7273H7V22.7273ZM24.2507 17.2468L19.7507 22.3377L21.2493 23.6623L25.7493 18.5714L24.2507 17.2468ZM21.2493 22.3377L18.9993 19.7923L17.5007 21.1168L19.7507 23.6623L21.2493 22.3377ZM7 16.3636H19.375V14.3636H7V16.3636ZM7 10H19.375V8H7V10Z" fill="black"/>
                </Svg>
            break;
        case "help":
            cardIcon =
                <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <Path d="M14.0002 24H11.2002C10.0801 24 9.51962 24 9.0918 23.782C8.71547 23.5903 8.40973 23.2843 8.21799 22.908C8 22.4801 8 21.9201 8 20.8V11.2C8 10.0799 8 9.51986 8.21799 9.09204C8.40973 8.71572 8.71547 8.40973 9.0918 8.21799C9.51962 8 10.0801 8 11.2002 8H20.8002C21.9203 8 22.48 8 22.9078 8.21799C23.2841 8.40973 23.5905 8.71572 23.7822 9.09204C24.0002 9.51986 24 10.0799 24 11.2V14M23 23L20 20M17.5 21C15.567 21 14 19.433 14 17.5C14 15.567 15.567 14 17.5 14C19.433 14 21 15.567 21 17.5C21 19.433 19.433 21 17.5 21Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </Svg>
            break;
        case "disney":
            cardIcon =
                <Image style={styles.icon} source={require('./assets/logoImages/disney.png')}/>
            break;
        case "gp":
            cardIcon =
                <Image style={styles.icon} source={require('./assets/logoImages/gp.png')}/>
            break;
        case "hbo":
            cardIcon =
                <Image style={styles.icon} source={require('./assets/logoImages/hbo.png')}/>
            break;
        case "netflix":
            cardIcon =
                <Image style={styles.icon} source={require('./assets/logoImages/netflix.png')}/>
            break;
        case "prime":
            cardIcon =
                <Image style={styles.icon} source={require('./assets/logoImages/prime.png')}/>
            break;
        case "spotify":
            cardIcon =
                <Image style={styles.icon} source={require('./assets/logoImages/spotify.png')}/>
            break;
        case "storytel":
            cardIcon =
                <Image style={styles.icon} source={require('./assets/logoImages/storytel.png')}/>
            break;  
    }

    return cardIcon;
}

const styles = StyleSheet.create({

    icon: {
      width: 32,
      height: 32,
    },
  
});
  