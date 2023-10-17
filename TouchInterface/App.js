import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TouchInterface from './TouchInterface';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.pianoContainer}>
        <TouchInterface />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pianoContainer: {
    flexDirection: 'row', // Ensure the keys are aligned horizontally
  },
  whiteKeyContainer: {
    flexDirection: 'row',
    flex: 7, // Adjust the flex values as needed to achieve the desired appearance
  },
  blackKeyContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
