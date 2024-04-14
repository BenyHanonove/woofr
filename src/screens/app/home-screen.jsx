// HomeScreen.js
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WoofrHeader from "./WoofrHeader";
import Feed from "./Feed"

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <WoofrHeader/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logo: {
    marginRight:15,
    marginTop:8,
    width: 140,
    height:44,
    
  },
});

export default HomeScreen;
