import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import RegularText from "../../texts/regular-text/regular-text";

const RegularButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <RegularText text={text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegularButton;
