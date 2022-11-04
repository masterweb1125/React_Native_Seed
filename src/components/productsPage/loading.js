import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
function Loading() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../../assets/85563-germination.json")}
        style={styles.animation}
        autoPlay
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: "center",
  },
  animation: {
    width: 160,
    height: 160,
  },
});
export default Loading;
