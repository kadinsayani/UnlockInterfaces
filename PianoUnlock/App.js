import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PianoUnlockInterface from "./PianoUnlock";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.pianoContainer}>
        <PianoUnlockInterface />
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
