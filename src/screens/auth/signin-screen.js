// SigninScreen.js
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

//React native expo store handler
import { SecureStore } from "expo";

//Navigation handler
import { useNavigation } from "@react-navigation/native";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import RegularText from "../../components/texts/regular-text/regular-text";

const SigninScreen = () => {
  // Navigation object for navigating between screens
  const navigation = useNavigation();

  // Function to login user
  const loginUser = async () => {
    // Dummy function to generate user token (to be replaced with actual login logic)
    const saveUser = () => {
      return "sahdkfjaskdflas$%^&";
    };

    // Save user token securely using SecureStore
    await SecureStore.setItemAsync("secure_token", saveUser);
  };

  // Navigate to the Signup screen using the navigation object
  const moveToSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BigText text={"היי כיף לראות שחזרת"} />
        <RegularText
          text={"אנחנו פה בשביל חיות המחמד שלך בלה בלה בלה צמשיך לעשות כיף פה"}
        />
      </View>

      <View>
        <TextInput placeholder="email ..." style={styles.input} />
        <TextInput placeholder="password..." style={styles.input} />
      </View>

      <View>
        <RegularButton text={"התחבר"} onPress={loginUser} />
        <View style={styles.divider}></View>
        <RegularButton text={"הירשם"} onPress={moveToSignup} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  header: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    direction: "rtl",
    textAlign: "left",
    paddingRight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: 300,
  },
  divider: {
    backgroundColor: "grey",
    height: 1,
    marginVertical: 10,
  },
});

export default SigninScreen;
