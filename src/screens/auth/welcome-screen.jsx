import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

// Store package for React Native Expo
import * as SecureStore from "expo-secure-store";

// Array of features
import { features } from "../../utils/data/features";

// Custom components
import BigText from "../../components/texts/big-text/big-text";
import FeatureSlider from "../../components/scroll/feature-slider/feature-slider";
import Pagination from "../../components/animation/pagination/pagination";
import RegularButton from "../../components/buttons/regular-button/regular-button";

const WelcomeScreen = () => {
  const [index, setIndex] = useState(0); // State variable to store the current index
  const scrollX = useRef(new Animated.Value(0)).current; // Ref for tracking scroll position
  const navigation = useNavigation(); // Navigation object for navigating between screens

  // Effect to run when component mounts (empty dependency array means it runs once)
  useEffect(() => {
    // Function to save isFirstOpening state to SecureStore
    const saveOpening = async () => {
      try {
        // Save isFirstOpening state as true in SecureStore
        await SecureStore.setItem("isFirstOpening", JSON.stringify(true));
      } catch (error) {
        // Log error if saving fails
        console.error("Error saving isFirstOpening state:", error);
      }
    };

    saveOpening();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <BigText text={"PAWSWIPE"} />
        <FeatureSlider index={index} setIndex={setIndex} scrollX={scrollX} />
        <Button
          title="בוא נתחיל"
          onPress={() => navigation.navigate("Signin")}
        />
        <Pagination data={features} scrollX={scrollX} index={index} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WelcomeScreen;
