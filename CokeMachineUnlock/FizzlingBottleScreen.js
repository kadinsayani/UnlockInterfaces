// FizzlingBottleScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import FizzlingBottle from './FizzlingBottle'; // Import the FizzlingBottle component

const FizzlingBottleScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FizzlingBottle />
        </View>
    );
};

export default FizzlingBottleScreen;
