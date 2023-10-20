import React from "react";
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import Constants from "expo-constants";

const AppDrawer = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#007bff" barStyle="light-content" />
      <View style={styles.statusBar}></View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.appText}>Home Screen</Text>
      </View>
      <View style={styles.drawer}>
        <View style={styles.appIcon}>
          <Text style={styles.appText}>App 1</Text>
        </View>
        <View style={styles.appIcon}>
          <Text style={styles.appText}>App 2</Text>
        </View>
        <View style={styles.appIcon}>
          <Text style={styles.appText}>App 3</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  statusBar: {
    backgroundColor: "#007bff",
    height: Constants.statusBarHeight,
  },
  drawer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  appIcon: {
    width: 120,
    height: 120,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  appText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AppDrawer;
