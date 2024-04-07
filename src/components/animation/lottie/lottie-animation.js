import React, { useRef, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

const LottieAnimation = ({ lottieSource, width = 200, height = 200 }) => {
  // Renamed component
  const animation = useRef(null);

  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: width,
          height: height,
        }}
        source={lottieSource}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});

export default LottieAnimation;
