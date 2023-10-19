import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";

const themes = {
  classical: {
    backgroundColor: "lightgray",
    keyColor: {
      white: "white",
      black: "black",
    },
    textColor: {
      white: "black",
      black: "white",
    },
  },
  colorful: {
    backgroundColor: "pink",
    keyColor: {
      white: "#FFF5EE",
      black: "#F33A6A",
    },
    textColor: {
      white: "#F33A6A",
      black: "white",
    },
  },
  dark: {
    backgroundColor: "#15369F",
    keyColor: {
      white: "#BBCBFF",
      black: "navy",
    },
    textColor: {
      white: "black",
      black: "white",
    },
  },
};

const PianoApp = () => {
  const [selectedTheme, setSelectedTheme] = useState("classical");

  const changeTheme = (newTheme) => {
    setSelectedTheme(newTheme);
  };

  const [pin, setPin] = useState([]);
  const [buttonState, setButtonState] = useState("set");
  const [enteredPin, setEnteredPin] = useState([]);
  const [unlocked, setUnlocked] = useState(false);

  const PianoKey = ({ note, isBlack, offset, theme }) => {
    const keyColor = isBlack ? theme.keyColor.black : theme.keyColor.white;
    const keyTextColor = isBlack
      ? theme.textColor.black
      : theme.textColor.white;

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

  const theme = themes[selectedTheme];

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.themeSelector}>
        {Object.keys(themes).map((themeName) => (
          <TouchableOpacity
            key={themeName}
            style={[
              styles.themeButton,
              {
                backgroundColor:
                  themeName === selectedTheme ? "white" : "lightgray",
              },
            ]}
            onPress={() => changeTheme(themeName)}
          >
            <Text style={styles.themeButtonText}>{themeName}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.piano}>
        {keys.map((key) => (
          <PianoKey
            key={key.note}
            note={key.note}
            isBlack={key.isBlack}
            offset={key.offset}
            theme={theme}
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
    justifyContent: "center",
    alignItems: "center",
  },
  themeSelector: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  themeButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  themeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  piano: {
    flexDirection: "row",
    backgroundColor: "black",
    borderRadius: 5,
  },
  whiteKey: {
    borderBottomWidth: 3,
    borderColor: "darkgrey",
    height: 200,
    width: 50,
    margin: 2,
    borderRadius: 5,
  },
  blackKey: {
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
