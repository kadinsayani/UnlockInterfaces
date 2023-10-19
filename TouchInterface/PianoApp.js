import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";

const PianoApp = () => {
  const [pin, setPin] = useState([]);
  const [buttonState, setButtonState] = useState("set");
  const [enteredPin, setEnteredPin] = useState([]);
  const [unlocked, setUnlocked] = useState(false);

  const PianoKey = ({ note, isBlack, offset }) => {
    const keyColor = isBlack ? "black" : "white";
    const keyTextColor = isBlack ? "white" : "black";

    const handleKeyPress = () => {
      if (buttonState === "set") {
        setPin((prevPin) => [...prevPin, note]);
      } else if (buttonState === "unlock") {
        setEnteredPin((prevEnteredPin) => [...prevEnteredPin, note]);
      }
    };

    return (
      <TouchableOpacity
        style={[
          styles.key,
          { backgroundColor: keyColor, marginLeft: offset },
          isBlack ? styles.blackKey : styles.whiteKey,
        ]}
        onPress={handleKeyPress}
      >
        <View style={styles.keyTextContainer}>
          <Text style={[styles.keyText, { color: keyTextColor }]}>{note}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleSetPin = () => {
    if (buttonState === "set") {
      console.log(`Pin set to ${pin}`);
      setButtonState("unlock");
    } else if (buttonState === "unlock") {
      if (enteredPin.join("") === pin.join("")) {
        setUnlocked(true);
        setButtonState("unlocked");
        console.log("unlocked");
      }
    }
  };

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
      offset: 0,
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
    },
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
      <Button title={buttonState} onPress={handleSetPin}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  piano: {
    flexDirection: "row",
  },
  whiteKey: {
    backgroundColor: "white",
    borderBottomWidth: 2,
    borderColor: "darkgrey",
    height: 200,
    width: 50,
    margin: 2,
    borderRadius: 5,
  },
  blackKey: {
    backgroundColor: "black",
    height: 100,
    width: 38,
    borderRadius: 5,
    zIndex: 1,
  },
  keyTextContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  keyText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PianoApp;
