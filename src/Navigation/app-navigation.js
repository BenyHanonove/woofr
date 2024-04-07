import React from "react";

//Navigation handlers
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//Screens
import HomeScreen from "../screens/app/home-screen";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
