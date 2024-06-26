//small-text.jsx

import React from "react";
import { StyleSheet, View, Text } from "react-native";

const SmallText = ({ text, english = false }) => {
  const textAlign = english ? "right" : "left";
  return <Text style={[styles.text, { textAlign }]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "left",
  },
});

export default SmallText;
