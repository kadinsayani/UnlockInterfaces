import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CokeMachineUnlockInterface from "./CokeMachineUnlock";

export default function App() {
  return (
    <View style={styles.container}>
      <CokeMachineUnlockInterface />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
