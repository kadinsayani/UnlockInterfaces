import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  PanResponder,
  Animated,
  ScrollView,
  Vibration,
} from "react-native";
import { Gyroscope } from "expo-sensors";
import AppDrawer from "./AppDrawer";
import LottieView from "lottie-react-native";

const initialCans = [
  { name: "coke", x: 56.0, y: 1.33, selected: false },
  { name: "coke_zero", x: 123.0, y: 1.33, selected: false },
  { name: "diet_coke", x: 196.0, y: 1.33, selected: false },
  { name: "sprite", x: 276.67, y: 1.33, selected: false },
  { name: "nestea", x: 55.0, y: 163.0, selected: false },
  { name: "vitamen1", x: 124.33, y: 163.0, selected: false },
  { name: "vitamen2", x: 197.33, y: 163.0, selected: false },
  { name: "monster", x: 271.33, y: 163.0, selected: false },
];

const images = {
  coke: require("./coke.png"),
  coke_zero: require("./coke_zero.png"),
  diet_coke: require("./diet_coke.png"),
  sprite: require("./sprite.png"),
  nestea: require("./nestea.png"),
  vitamen2: require("./vitamen2.png"),
  vitamen1: require("./vitamen1.png"),
  monster: require("./monster.png"),
};

export default function CokeMachineUnlockInterface() {
  const [locationX, setLocationX] = useState(0);
  const [locationY, setLocationY] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [correctPass, setCorrectPass] = useState(false);
  const [shaken, setShaken] = useState(false);
  const [addedImages, setAddedImages] = useState([]); // State to store added images
  const [checkImages, setCheckImages] = useState([8, 1, 5, 7]); // State to store added images
  const [hasAddedThisShake, setHasAddedThisShake] = useState(false); // Track whether an image has been added during the current shake event
  const scaleValue = new Animated.Value(1);
  const [showAnimation, setShowAnimation] = useState(false); 
  const [showWrongPinMessage, setShowWrongPinMessage] = useState(false);

  const startScaleAnimation = () => {
    Animated.timing(scaleValue, {
      toValue: 0.5, // Adjust the final scale factor as needed
      duration: 500, // Adjust the duration of the animation
      useNativeDriver: false,
    }).start(() => {
      // This callback function is executed when the animation is complete
      scaleValue.setValue(1); // Reset the scale value to 1
    });
  };

  const checkCoordinates = (x, y) => {
    for (const can of initialCans) {
      if (x >= can.x && x <= can.x + 28.0 && y >= can.y && y <= can.y + 125.0) {
        setSelectedImage(images[can.name]);
        startScaleAnimation();
        // Set the position of the selected image based on the click coordinates
        setSelectedImagePosition(can.x + 30, can.y + 90);
        break; // Stop checking once you've found a match
      } else {
        setSelectedImage(null);
        scaleValue.setValue(1);
      }
    }
  };

  const setSelectedImagePosition = (x, y) => {
    // Calculate the left and top position of the selected image
    const left = x - 100; // Adjust this value as needed
    const top = y - 100; // Adjust this value as needed

    setSelectedImageStyle({
      left,
      top,
    });
  };

  const [selectedImageStyle, setSelectedImageStyle] = useState({
    left: 0,
    top: 0,
  });

  const handleShake = () => {
    if (selectedImage && !hasAddedThisShake) {
      // Start fizzle animation when an image is added
      setShowAnimation(true);
      setAddedImages([...addedImages, selectedImage]);
      console.log(addedImages);
      console.log("Added an image:", selectedImage);
    } else {
      console.log("No image selected to add.");
    }
  };



  useEffect(() => {
    Gyroscope.addListener(({ x, y, z }) => {
      if (x > 7|| y > 7|| z > 7) {
        // The shake event occurs, which calls handleShake
        if (!hasAddedThisShake) {
          handleShake();
        }
      }
    });

    return () => {
      Gyroscope.removeAllListeners();
    };
  }, [selectedImage]); // This useEffect will run when selectedImage changes

  useEffect(() => {
    // Reset hasAddedThisShake when the selected image changes
    setHasAddedThisShake(false);
  }, [selectedImage]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (event, gestureState) => true,
    onStartShouldSetPanResponderCapture: (event, gestureState) => true,
    onMoveShouldSetPanResponder: (event, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (event, gestureState) => false,
    onPanResponderGrant: (event, gestureState) => false,
    onPanResponderMove: (event, gestureState) => false,
    onPanResponderRelease: (event, gestureState) => {
      setLocationX(event.nativeEvent.locationX.toFixed(2));
      setLocationY(event.nativeEvent.locationY.toFixed(2));
      checkCoordinates(
        event.nativeEvent.locationX.toFixed(2),
        event.nativeEvent.locationY.toFixed(2)
      );
    },
  });

  useEffect(() => {
    console.log(`${locationX}, ${locationY}`);
  }, [locationX, locationY]);

  useEffect(() => {
    // Check if addedImages and checkImages match
    if (addedImages.length == 4 && showAnimation == false) {
      if (JSON.stringify(addedImages) === JSON.stringify(checkImages)) {
        setCorrectPass(true);
      } else {
        setAddedImages([]);
        Vibration.vibrate(500);
        setShowWrongPinMessage(true);
  
      // Set a timer to hide the message after 2 seconds
        const hideMessageTimer = setTimeout(() => {
          setShowWrongPinMessage(false);
        }, 2000);
      }
    }
  }, [addedImages, checkImages, showAnimation]);

  return (
    <View>
      {correctPass ? (
        <View style={styles.device}>
          <View style={styles.unlockedContainer}>
            <AppDrawer />
          </View>
        </View>
      ) : (
        <View styles={styles.device}>
          <View {...panResponder.panHandlers}>
            <Image
              source={require("./vendingMachine.png")}
              style={{ width: 400, height: 650 }}
            />
            {showWrongPinMessage && (
            <View style={styles.wrongPinMessageContainer}>
              <Text style={styles.wrongPinMessageText}>Wrong Pin</Text>
            </View>
          )}
            {selectedImage && (
              <Animated.Image
                source={selectedImage}
                style={{
                  position: "absolute",
                  width: 150,
                  height: 150,
                  transform: [{ scale: scaleValue }],
                  ...selectedImageStyle,
                }}
              />
            )}
            <View
              style={{
                position: "absolute",
                top: 500,
                left: 70,
                width: "100%",
                height: "100%",
              }}
            >
              <ScrollView horizontal>
                {addedImages.map((image, index) => (
                  <Image
                    key={index}
                    source={image}
                    style={{
                      width: 70,
                      height: 70,
                      marginRight: 0,
                    }}
                  />
                ))}
              </ScrollView>
            </View>
            {showAnimation && !hasAddedThisShake && selectedImage && (
              <LottieView
                source={require('./assets/animation_lnz5i3ec.json')} // Specify the path to your Lottie animation JSON file
                autoPlay
                loop = {false}
                style={{
                  position: "absolute",
                  width: 400,
                  height: 650,
                }}
                onAnimationFinish={() => {
                  // Animation has finished playing, set showAnimation to false
                  setSelectedImage(null);
                  setShowAnimation(false);
                  setHasAddedThisShake(true);
                }}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  device: {
    width: "100vw",
    height: "100vh",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  wrongPinMessageContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    top: 400, // Adjust the top position as needed
    left: 0,
    right: 0,
  },
  wrongPinMessageText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

