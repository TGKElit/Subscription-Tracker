import { StyleSheet, Text, View } from "react-native";
import { SettingsButton } from "../src/Components/SettingsButton/SettingsButton";
import React from "react";

const SettingsScreen = () => {
  return (
    <View>
      <Text>Inställningar</Text>
      <SettingsButton></SettingsButton>
      <SettingsButton></SettingsButton>
      <SettingsButton></SettingsButton>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
