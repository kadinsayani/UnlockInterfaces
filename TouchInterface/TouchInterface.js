import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PianoKey = ({ note, isBlack }) => {
  const keyColor = isBlack ? 'black' : 'white';
  const keyTextColor = isBlack ? 'white' : 'black';

  return (
    <TouchableOpacity
      style={[
        styles.key,
        { backgroundColor: keyColor },
        isBlack ? styles.blackKey : styles.whiteKey,
      ]}
    >
      <View style={styles.keyTextContainer}>
        <Text style={[styles.keyText, { color: keyTextColor }]}>{note}</Text>
      </View>
    </TouchableOpacity>
  );
};

const PianoApp = () => {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = ['Db', 'Eb', 'Gb', 'Ab', 'Bb'];

  return (
    <View style={styles.container}>
      <View style={styles.piano}>
        {whiteKeys.map((note) => (
          <PianoKey key={note} note={note} isBlack={false} />
        ))}
        {blackKeys.map((note) => (
          <PianoKey key={note} note={note} isBlack={true} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray', // Use a lighter background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  piano: {
    flexDirection: 'row',
  },
  key: {
    flex: 1,
    margin: 1,
    height: 120,
    justifyContent: 'flex-end',
  },
  whiteKey: {
    borderBottomWidth: 5,
    borderColor: 'black',
  },
  blackKey: {
    backgroundColor: 'black',
  },
  keyTextContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  keyText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PianoApp;
