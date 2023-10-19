import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PianoApp from "./PianoApp";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.pianoContainer}>
        <PianoApp />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  pianoContainer: {
    flexDirection: "row",
  },
});
