// SigninScreen.js
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

//Navigation handler
import { useNavigation } from "@react-navigation/native";

//Store package for react native expo
import * as SecureStore from "expo-secure-store";

//Custom components
import BigText from "../../components/texts/big-text/big-text";
import RegularButton from "../../components/buttons/regular-button/regular-button";
import RegularText from "../../components/texts/regular-text/regular-text";

const SigninScreen = () => {
  // Navigation object for navigating between screens
  const navigation = useNavigation();

  //State to save the form data for login
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Function to login user
  const handleLoginEvent = async () => {
    const tempUser = {
      id: "123456",
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      birthday: new Date(1990, 5, 15),
      email: "johndoe@example.com",
      password: "password123",
      confirm: "password123",
    };

    await SecureStore.setItem("user", JSON.stringify(tempUser));
  };

  // Navigate to the Signup screen using the navigation object
  const moveToSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.header}>
          <BigText text={"היי כיף לראות שחזרת"} />
          <RegularText
            text={
              "אנחנו פה בשביל חיות המחמד שלך בלה בלה בלה להמשיך לעשות כיף פה"
            }
          />
        </View>

        <View>
          <TextInput
            placeholder="איימל"
            style={styles.input}
            onChangeText={(value) => {
              setLoginData({ ...loginData, email: value });
            }}
          />
          <TextInput
            placeholder="סיסמא"
            style={styles.input}
            onChangeText={(value) => {
              setLoginData({ ...loginData, password: value });
            }}
          />
        </View>

        <View>
          <RegularButton text={"התחבר"} onPress={handleLoginEvent} />
          <View style={styles.divider}></View>
          <RegularButton text={"הירשם"} onPress={moveToSignup} />
        </View>
      </View>
    </SafeAreaView>
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
