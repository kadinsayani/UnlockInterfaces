import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  PanResponder,
  Animated,
} from "react-native";

const initialCans = [
  { name: "coke", x: 56.00, y: 1.33, selected: false },
  { name: "coke_zero", x: 123.00, y: 1.33, selected: false },
  { name: "diet_coke", x: 196.00, y: 1.33, selected: false },
  { name: "sprite", x: 276.67, y: 1.33, selected: false },
  { name: "fanta", x: 55.00, y: 163.00, selected: false },
  { name: "pepsi", x: 124.33, y: 163.00, selected: false },
  { name: "beer", x: 197.33, y: 163.00, selected: false },
  { name: "monster", x: 271.33, y: 163.00, selected: false },
]

const images = {
  coke: require("./coke.png"),
  coke_zero: require("./coke_zero.png"),
  diet_coke: require("./diet_coke.png"),
  sprite: require("./budlight.png"),
  fanta: require("./fanta.png"),
  beer: require("./beer.png"),
  pepsi: require("./bud.png"),
  monster: require("./monster.png"),
};

export default function SensorInterface() {
  const [locationX, setLocationX] = useState(0);
  const [locationY, setLocationY] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const scaleValue = new Animated.Value(1);

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
      if (
        (x >= can.x && x <= can.x + 28.00) &&
        (y >= can.y && y <= can.y + 125.00)
      ) {
        setSelectedImage(images[can.name]);
        startScaleAnimation();
        // Set the position of the selected image based on the click coordinates
        setSelectedImagePosition(can.x +30, can.y+90);
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
      checkCoordinates(event.nativeEvent.locationX.toFixed(2), event.nativeEvent.locationY.toFixed(2));
    },
  });

  useEffect(() => {
    console.log(`${locationX}, ${locationY}`);
  }, [locationX, locationY]);

  return (
    <View {...panResponder.panHandlers}>
      <Image
        source={require("./vendingMachine.png")}
        style={{ width: 400, height: 650 }}
      />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
