import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import * as SecureStore from "expo-secure-store";

//Navigation handlers
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//Screens
import WelcomeScreen from "../screens/auth/welcome-screen";
import SigninScreen from "../screens/auth/signin-screen";
import SignupScreen from "../screens/auth/signup-screen";
import ImageScreen from "../screens/auth/image-screen";

const Stack = createStackNavigator();

const AuthNavigation = ({}) => {
  const [isFirstOpening, setIsFirstOpening] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkFirstOpening = async () => {
      try {
        const opening = await SecureStore.getItem("isFirstOpening");
        if (opening === null) {
          setIsFirstOpening(true);
        } else {
          setIsFirstOpening(false);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error checking isFirstOpening state:", error);
      }
    };

    checkFirstOpening();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isFirstOpening ? "Welcome" : "Signin"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Image" component={ImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
