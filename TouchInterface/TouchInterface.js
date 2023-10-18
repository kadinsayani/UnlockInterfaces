import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PianoKey = ({ note, isBlack, offset }) => {
  const keyColor = isBlack ? 'black' : 'white';
  const keyTextColor = isBlack ? 'white' : 'black';

  return (
    <TouchableOpacity
      style={[
        styles.key,
        { backgroundColor: keyColor, marginLeft: offset },
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
      offset: -20,
    },
    {
      isBlack: false,
      note: "D",
      offset: -18,
    },
    {
      isBlack: true,
      note: "D#",
      offset: -20,
    },
    {
      isBlack: false,
      note: "E",
      offset: -18,
    },
    {
      isBlack: false,
      note: "F",
      offset:0,
    },
    {
      isBlack: true,
      note: "F#",
      offset: -18,
    },
    {
      isBlack: false,
      note: "G",
      offset: -20,
    },
    {
      isBlack: true,
      note: "G#",
      offset: -18,
    },
    {
      isBlack: false,
      note: "A",
      offset: -20,
    },
    {
      isBlack: true,
      note: "A#",
      offset: -18,
    },
    {
      isBlack: false,
      note: "B",
      offset: -20,
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
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  piano: {
    flexDirection: 'row',
  },
  whiteKey: {
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderColor: 'darkgrey',
    height: 200,
    width: 50,
    margin:2,
    borderRadius:5,
  },
  blackKey: {
    backgroundColor: 'black',
    height: 100,
    width: 38,
    borderRadius:5,
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
