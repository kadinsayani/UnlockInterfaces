import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TouchInterface from "./TouchInterface";

export default function App() {
  return (
    <View style={styles.container}>
      <TouchInterface />
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
