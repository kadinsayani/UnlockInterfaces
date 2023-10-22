import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Animated,
  Easing,
} from "react-native";
import { Audio } from "expo-av";
import AppDrawer from "./AppDrawer";

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
};

const PianoUnlockInterface = () => {
  const [selectedTheme, setSelectedTheme] = useState("classical");
  const [showInstructions, setShowInstructions] = useState(true);

  const changeTheme = (newTheme) => {
    setSelectedTheme(newTheme);
  };

  const [pin, setPin] = useState([]);
  const [buttonState, setButtonState] = useState("set");
  const [enteredPin, setEnteredPin] = useState([]);
  const [unlocked, setUnlocked] = useState(false);

  const unlockAnimation = useRef(new Animated.Value(0)).current;

  const startUnlockAnimation = () => {
    Animated.timing(unlockAnimation, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      // Reset the animation value when it's done
      unlockAnimation.setValue(0);
    });
  };

  useEffect(() => {
    if (unlocked) {
      startUnlockAnimation();
    }
  }, [unlocked]);

  const PianoKey = ({ note, isBlack, offset, theme }) => {
    const keyColor = isBlack ? theme.keyColor.black : theme.keyColor.white;
    const keyTextColor = isBlack
      ? theme.textColor.black
      : theme.textColor.white;

    const playSound = async () => {
      const soundObject = new Audio.Sound();
      try {
        const soundFile = soundFileMappings[note];
        await soundObject.loadAsync(soundFile);
        await soundObject.playAsync();
      } catch (error) {
        console.log("Error playing sound:", error);
      }
    };

    const handleKeyPress = () => {
      playSound();
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

  const handleButton = () => {
    if (buttonState === "set") {
      console.log(`Pin set to ${pin}`);
      setButtonState("unlock");
      // Hide the instructions when the "SET" button is pressed
      setShowInstructions(false);
    } else if (buttonState === "unlock") {
      if (enteredPin.join("") === pin.join("")) {
        setUnlocked(true);
        setButtonState("lock");
        console.log("unlocked");
      } else {
        setEnteredPin([]);
        console.log("incorrect pin");
      }
    } else if (buttonState === "lock") {
      setUnlocked(false);
      setButtonState("unlock");
      console.log("locked");
    }
  };

  const keys = [
    {
      isBlack: false,
      note: "C",
    },
    {
      isBlack: true,
      note: "Cb",
      offset: -20,
    },
    {
      isBlack: false,
      note: "D",
      offset: -18,
    },
    {
      isBlack: true,
      note: "Db",
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
      note: "Fb",
      offset: -18,
    },
    {
      isBlack: false,
      note: "G",
      offset: -20,
    },
    {
      isBlack: true,
      note: "Gb",
      offset: -18,
    },
    {
      isBlack: false,
      note: "A",
      offset: -20,
    },
    {
      isBlack: true,
      note: "Ab",
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
    <View>
      {unlocked ? (
        <Animated.View
          style={[
            styles.container,
            {
              opacity: unlockAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0], // Fading out the lock screen
              }),
            },
          ]}
        >
          <View style={styles.unlockedContainer}>
            <AppDrawer />
            <Text style={styles.unlockedText}>Unlocked</Text>
          </View>
          <Button title={buttonState} onPress={handleButton}></Button>
        </Animated.View>
      ) : (
        <View style={[styles.flexContainer, { backgroundColor: theme.backgroundColor }]}>
          {showInstructions && (
            <Text style={styles.instructions}>
              Set the tune for unlocking your phone by
            </Text>
          )}
          {showInstructions && (
            <Text style={styles.instructions}>
              pressing the piano keys and clicking the "SET" button
            </Text>
          )}
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
          <Button title={buttonState} onPress={handleButton} style={styles.setButton}></Button>
        </View>
      )}
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
    marginBottom: 10,
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
  unlockedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 5,
  },
  unlockedText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  unlockAnimation: {
    alignItems: "center",
  },
  flexContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  instructions: {
    textAlign: "center",
    fontSize: 15,
    marginBottom: 5,
  },
  setButton: {
    padding: 10,
  },
});

export default PianoUnlockInterface;
