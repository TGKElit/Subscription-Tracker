import React, { FC } from "react";
import { View, StyleSheet, Pressable, } from "react-native";
import Svg, { Path } from 'react-native-svg';


export const Navbar: FC<any> = ({navigation, screen}) => {
    let offset;
    if (screen === "settings") {
        offset = styles.settingsOffset;
    }else if (screen === "statistics") {
        offset = styles.statitsicsOffset;
    }else {
        offset = styles.subscriptionOffset;
    }
    return(
        <>
           <View style={[styles.border, offset]}></View>
            <View style={styles.container}>
                <Pressable onPress={() => navigation.navigate("Settings")}>
                <Svg style={styles.icon} width="44" height="44" viewBox="-7 -7 44 44" fill="none">
                    <Path d="
                                M15,9
                                A5,5 0 1,1 15,19
                                A5,5 0 1,1 15,9"
                            fill="none"
                            stroke="black"
                            strokeWidth="3" />
                    <Path d="M25.8592 10.0836L25.3829 9.82428C25.309 9.78401 25.2719 9.7638 25.2362 9.74286C24.8811 9.53464 24.582 9.24643 24.3635 8.90224C24.3415 8.8676 24.32 8.83181 24.2776 8.76003C24.2352 8.68816 24.2139 8.65206 24.1942 8.61605C23.9982 8.25797 23.8928 7.85924 23.8864 7.45308C23.8859 7.41639 23.8865 7.37885 23.8877 7.31142L23.8881 7.28742L23.8972 6.75664C23.9122 5.88342 23.9196 5.44688 23.7947 5.0554C23.6843 4.70908 23.4997 4.38979 23.2528 4.11909C22.9743 3.81362 22.5882 3.59583 21.8177 3.16128L21.8137 3.15903L21.1715 2.79682C20.4005 2.36197 20.0149 2.14464 19.6056 2.06173C19.2434 1.98837 18.8695 1.99131 18.5087 2.07058C18.1019 2.15997 17.7215 2.38292 16.9619 2.82807L16.9561 2.83147L16.4959 3.10114C16.4231 3.14378 16.3863 3.16505 16.3499 3.18489C15.988 3.38183 15.5833 3.49141 15.1694 3.50441C15.1277 3.50572 15.0853 3.50572 15.0005 3.50572H14.9994C14.9151 3.50572 14.8732 3.50572 14.8315 3.50441C14.4168 3.49136 14.0108 3.38128 13.6483 3.18353C13.6131 3.16432 13.5781 3.14376 13.5104 3.10395L13.5026 3.09938L13.0395 2.82728L13.036 2.82523C12.2719 2.37623 11.8895 2.15152 11.4806 2.06173C11.1183 1.98217 10.7425 1.9795 10.3791 2.0538C9.96823 2.13779 9.58146 2.35746 8.80827 2.79667L8.17406 3.15693C7.40489 3.59386 7.02086 3.81222 6.74338 4.11791C6.49789 4.38834 6.31402 4.70689 6.2042 5.05229C6.08006 5.44272 6.08706 5.87795 6.10202 6.74825L6.11131 7.28878C6.11272 7.37064 6.11365 7.41159 6.11304 7.45185C6.10689 7.85884 6.001 8.25842 5.80448 8.61714C5.78504 8.65262 5.7641 8.6881 5.72228 8.75896C5.68043 8.82987 5.65952 8.86524 5.63782 8.89947C5.4184 9.24549 5.11736 9.53506 4.75997 9.74363C4.72462 9.76427 4.68833 9.78411 4.61512 9.82381L4.14491 10.0788L4.14472 10.0789C3.3625 10.5032 2.97146 10.7153 2.68692 11.0175C2.43517 11.2848 2.24456 11.6019 2.12847 11.9472C1.99742 12.3371 1.99843 12.7742 2.00046 13.6473L2.00047 13.6508L2.00213 14.3663L2.00215 14.374C2.00415 15.2385 2.00516 15.6718 2.13628 16.0584C2.25263 16.4014 2.4423 16.7162 2.69263 16.9819C2.97528 17.282 3.36321 17.4932 4.13793 17.915L4.14046 17.9164L4.60649 18.1701L4.61284 18.1736C4.68795 18.2145 4.72667 18.2356 4.76388 18.2575C5.11802 18.4662 5.41582 18.7546 5.63338 19.0987C5.65688 19.1358 5.67944 19.1744 5.72456 19.2516C5.76912 19.3277 5.79166 19.3658 5.81227 19.404C6.00302 19.7575 6.1061 20.1499 6.11306 20.5496C6.11381 20.5928 6.11311 20.6368 6.1116 20.7245L6.10265 21.2433L6.10262 21.2452C6.08758 22.1172 6.08005 22.5534 6.20483 22.9446C6.3153 23.291 6.50037 23.6102 6.74719 23.8809C7.02618 24.1869 7.41231 24.4051 8.18549 24.8411L8.82756 25.2033C9.59857 25.6381 9.98464 25.8554 10.394 25.9383C10.7561 26.0117 11.1299 26.0087 11.4907 25.9294C11.8977 25.84 12.2783 25.617 13.0385 25.1715L13.0433 25.1686L13.5035 24.8989C13.5763 24.8563 13.6129 24.835 13.6494 24.8152C14.0113 24.6182 14.4158 24.5086 14.8296 24.4956C14.8713 24.4943 14.9138 24.4943 14.9986 24.4943C15.0837 24.4943 15.1267 24.4943 15.1685 24.4956C15.5833 24.5087 15.9887 24.6187 16.3511 24.8164C16.3877 24.8364 16.4243 24.8578 16.4972 24.9006L16.9603 25.1727L16.9611 25.1732C17.727 25.6233 18.11 25.8483 18.5193 25.9382C18.8816 26.0177 19.2567 26.0206 19.6202 25.9463C20.031 25.8623 20.418 25.6426 21.1912 25.2034L21.8254 24.8432C22.5946 24.4062 22.9787 24.1878 23.2562 23.8821C23.5017 23.6117 23.6856 23.2932 23.7954 22.9478C23.9195 22.5573 23.9123 22.1222 23.8974 21.2519L23.8881 20.7113L23.8876 20.6844C23.8865 20.62 23.8859 20.5839 23.8864 20.5483C23.8926 20.1413 23.9983 19.7417 24.1948 19.383C24.2142 19.3475 24.2352 19.312 24.277 19.2411C24.3188 19.1702 24.3402 19.1347 24.3619 19.1005C24.5813 18.7545 24.882 18.4651 25.2394 18.2565C25.2736 18.2365 25.3093 18.2172 25.3779 18.18L25.3848 18.1762L25.855 17.9212C26.6374 17.4969 27.0282 17.2848 27.3128 16.9826C27.5646 16.7152 27.7548 16.3982 27.8709 16.0529C28.0021 15.6625 28.0016 15.2248 27.9996 14.3493L27.9979 13.6338C27.9959 12.7643 27.9948 12.3294 27.8633 11.9416C27.7469 11.5986 27.5571 11.2838 27.3068 11.0181C27.0238 10.7177 26.6356 10.5063 25.8592 10.0836Z" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </Svg>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("SubscriptionScreen")}>
                    <Svg style={styles.icon} width="44" height="44" viewBox="0 0 44 44" fill="none" >
                        <Path d="M8.625 27.9444H19.0278M26.4583 26.4583L35.375 26.4583M30.9167 30.9167V22M8.625 20.5139H24.9722M8.625 13.0833H24.9722" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </Svg>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Statistics")}>
                    <Svg style={styles.icon} width="44" height="44" viewBox="0 0 44 44" fill="none">
                        <Path d="M17.8333 33.1111V20.6111H11.7217C10.9438 20.6111 10.5553 20.6111 10.2582 20.7625C9.99686 20.8956 9.78454 21.1081 9.65138 21.3695C9.5 21.6666 9.5 22.0554 9.5 22.8333V33.1111H17.8333ZM17.8333 33.1111H26.1667M17.8333 33.1111V13.1111C17.8333 12.3332 17.8333 11.9444 17.9847 11.6473C18.1179 11.3859 18.3302 11.1734 18.5915 11.0403C18.8886 10.8889 19.2772 10.8889 20.055 10.8889H23.9439C24.7218 10.8889 25.1118 10.8889 25.4089 11.0403C25.6702 11.1734 25.8816 11.3859 26.0148 11.6473C26.1661 11.9444 26.1667 12.3332 26.1667 13.1111V33.1111M26.1667 33.1111L34.5 33.1111V18.6666C34.5 17.8888 34.4995 17.4999 34.3481 17.2028C34.2149 16.9415 34.0035 16.729 33.7422 16.5958C33.4451 16.4444 33.0556 16.4444 32.2778 16.4444H26.1667V33.1111Z" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </Svg>
                </Pressable>
            </View>
        </>
    );
}



const styles = StyleSheet.create({
    container: {
        height: 64,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        position: "absolute",
        bottom: 0,
        backgroundColor: "white",
    },

    border: {
        width: "33%",
        height: 2,
        backgroundColor: "red",
        position: "absolute",
        bottom: 64,
    },

    settingsOffset: {
        left: 0,
    },

    subscriptionOffset: {
        left: "33%",
    },

    statitsicsOffset: {
        right: 0,
    },

    icon: {
        height: 44,
        width: 44,
        margin: 12,
    },
});
