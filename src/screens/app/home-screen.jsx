// HomeScreen.js
import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ width: '100%', alignItems:"flex-end" }}>
          <Image
            style={styles.logo}
            source={require('../../images/logo-wofer2.png')}
          />
        </View>
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
