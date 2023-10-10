import { PRIMARY_COLOR, TERTIARY_COLOR } from "../types/Styling";
import { IconButton } from "react-native-paper";
import { View } from "react-native";
import * as React from "react";

export default function Logo() {
  return (
    <View
      style={{
        borderRadius: 50,
        backgroundColor: PRIMARY_COLOR,
      }}
    >
      <IconButton icon="invert-colors" iconColor={TERTIARY_COLOR} size={70} />
    </View>
  );
}
