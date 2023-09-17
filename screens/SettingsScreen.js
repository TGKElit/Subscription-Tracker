import { StyleSheet, Text, View } from "react-native";
import { Card } from "../src/Components/Card/Card";
import React from "react";

const SettingsScreen = () => {
  return (
    <View>
      <Text>Inställningar</Text>
      <Card title="Om oss" icon=""></Card>
      <Card title="Villkor" icon=""></Card>
      <Card title="Hjäp" icon=""></Card>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({

});
