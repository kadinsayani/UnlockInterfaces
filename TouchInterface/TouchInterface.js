import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PianoKey = ({ note, isBlack, isSharp }) => {
  const keyColor = isBlack ? 'black' : 'white';
  const keyTextColor = isBlack ? 'white' : 'black';

  return (
    <TouchableOpacity
      style={[
        styles.key,
        { backgroundColor: keyColor, height: isSharp ? 80 : 120 },
        isBlack ? styles.blackKey : styles.whiteKey, // Apply styles for both black and white keys
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
  const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];

  const keys = [
    {
      isBlack: false,
      note: "C"
    },
    {
      isBlack: true,
      note: "C#"
    },
    {
      isBlack: false,
      note: "D"
    },
    {
      isBlack: true,
      note: "D#"
    },
    {
      isBlack: false,
      note: "E"
    },
    {
      isBlack: false,
      note: "F"
    },
    {
      isBlack: true,
      note: "F#"
    },
    {
      isBlack: false,
      note: "G"
    },
    {
      isBlack: true,
      note: "G#"
    },
    {
      isBlack: false,
      note: "A"
    },
    {
      isBlack: true,
      note: "A#"
    },
    {
      isBlack: false,
      note: "B"
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.piano}>
        {keys.map((key, index) => (
          <PianoKey
            key={key.note}
            note={key.note}
            isBlack={key.isBlack}
            isSharp={blackKeys.includes(key.note)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
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
  },
  whiteKey: {
    backgroundColor: 'white',
    borderBottomWidth: 3,
    borderColor: 'black',
  },
  blackKey: {
    backgroundColor: 'black',
    height: 80,
    width: 60,
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
