import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PianoKey = ({ note, isBlack, isSharp, offset }) => {
  const keyColor = isBlack ? 'black' : 'white';
  const keyTextColor = isBlack ? 'white' : 'black';

  return (
    <TouchableOpacity
      style={[
        styles.key,
        { backgroundColor: keyColor, height: isSharp ? 80 : 120, marginLeft: offset },
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
  const blackKeys = ['C#', 'D#', 'F#', 'G#', 'A#'];

  const keys = [
    {
      isBlack: false,
      note: "C",

    },
    {
      isBlack: true,
      note: "C#",
      offset: -15, // Adjust the offset for C# key
    },
    {
      isBlack: false,
      note: "D",
      offset: -17,
    },
    {
      isBlack: true,
      note: "D#",
      offset: -15,
    },
    {
      isBlack: false,
      note: "E",
      offset: -17,
    },
    {
      isBlack: false,
      note: "F"
    },
    {
      isBlack: true,
      note: "F#",
      offset: -15,
    },
    {
      isBlack: false,
      note: "G",
      offset: -17,
    },
    {
      isBlack: true,
      note: "G#",
      offset: -15,
    },
    {
      isBlack: false,
      note: "A",
      offset: -17,
    },
    {
      isBlack: true,
      note: "A#",
      offset: -15,
    },
    {
      isBlack: false,
      note: "B",
      offset: -17,
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.piano}>
        {keys.map((key) => (
          <PianoKey
            key={key.note}
            note={key.note}
            isBlack={key.isBlack}
            isSharp={blackKeys.includes(key.note)}
            offset={key.offset}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
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

  },
  whiteKey: {
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderColor: 'darkgrey',
        height: 120,
  },
  blackKey: {
    backgroundColor: 'black',
    height: 70,
    width: 60,
    zIndex: 1,
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
