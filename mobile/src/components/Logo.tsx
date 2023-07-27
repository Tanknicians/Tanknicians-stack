import * as React from "react";
import { IconButton, MD3Colors } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { white } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";

const style = StyleSheet.create({
  blueCircle: {
    borderRadius: 50,
    backgroundColor: "#1976d2",
  },
});

export default function Logo() {
  return (
    <View style={style.blueCircle}>
      <IconButton
        icon="invert-colors"
        iconColor="white"
        size={50}
        onPress={() => console.log("Logo Pressed")}
      />
    </View>
  );
}
