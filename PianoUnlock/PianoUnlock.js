import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";

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
    backgroundColor: "navy",
    keyColor: {
      white: "#BBCBFF",
      black: "mediumblue",
    },
    textColor: {
      white: "black",
      black: "white",
    },
  },
};

const soundFileMappings = {
  C: require("./assets/C.mp3"),
  Db: require("./assets/Db.mp3"),
  D: require("./assets/D.mp3"),
  Eb: require("./assets/Eb.mp3"),
  E: require("./assets/E.mp3"),
  F: require("./assets/F.mp3"),
  G: require("./assets/G.mp3"),
  Gb: require("./assets/Gb.mp3"),
  A: require("./assets/A.mp3"),
  Ab: require("./assets/Ab.mp3"),
  Bb: require("./assets/Bb.mp3"),
  B: require("./assets/B.mp3"),
  // Add mappings for other notes
};

const PianoKey = ({ note, isBlack, offset, theme }) => {
  const keyColor = isBlack ? theme.keyColor.black : theme.keyColor.white;
  const keyTextColor = isBlack ? theme.textColor.black : theme.textColor.white;

  const playSound = async () => {
    const soundObject = new Audio.Sound();
    try {
      const soundFile = soundFileMappings[note]; // Get the sound file based on the note
      await soundObject.loadAsync(soundFile);
      await soundObject.playAsync();
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.key,
        { backgroundColor: keyColor, marginLeft: offset },
        isBlack ? styles.blackKey : styles.whiteKey,
      ]}
      onPress={playSound}
    >
      <View style={styles.keyTextContainer}>
        <Text style={[styles.keyText, { color: keyTextColor }]}>{note}</Text>
      </View>
    </TouchableOpacity>
  );
};

const PianoUnlockInterface = () => {
  const [selectedTheme, setSelectedTheme] = useState("classical"); // Default theme

  const whiteKeys = ["C", "D", "E", "F", "G", "A", "B"];
  const blackKeys = ["Db", "Eb", "Gb", "Ab", "Bb"];

  const keys = [
    {
      isBlack: false,
      note: "C",
    },
    {
      isBlack: true,
      note: "Db",
      offset: -20,
    },
    {
      isBlack: false,
      note: "D",
      offset: -18,
    },
    {
      isBlack: true,
      note: "Eb",
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
      note: "Gb",
      offset: -18,
    },
    {
      isBlack: false,
      note: "G",
      offset: -20,
    },
    {
      isBlack: true,
      note: "Ab",
      offset: -18,
    },
    {
      isBlack: false,
      note: "A",
      offset: -20,
    },
    {
      isBlack: true,
      note: "Bb",
      offset: -18,
    },
    {
      isBlack: false,
      note: "B",
      offset: -20,
    },
  ];

  const theme = themes[selectedTheme];

  const changeTheme = (newTheme) => {
    setSelectedTheme(newTheme);
  };

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
    margin: 20,
    borderRadius: 12,
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

export default PianoUnlockInterface;
