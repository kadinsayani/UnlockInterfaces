import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Gyroscope } from 'expo-sensors'; // Change this line
import LottieView from "lottie-react-native";


const FizzlingBottle = () => {
    const animation = useRef(null);
    const [isFizzling, setIsFizzling] = useState(false);

    useEffect(() => {
        Gyroscope.addListener(({ x, y, z }) => {
            if (x > 4 || y > 4 || z > 4) {
                console.log('Device shaken');
                setIsFizzling(true);
            }

        });
        return () => {
            Gyroscope.removeAllListeners();
        };
    }, []); // This part is wrong I think.


    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Shake the phone to start fizzling!
            </Text>
            {isFizzling && (
                <View style={styles.animationContainer}>
                    <LottieView
                        autoPlay
                        ref={animation}
                        style={{
                            width: 600,
                            height: 600,
                            backgroundColor: '#eee',
                        }}
                        // Find more Lottie files at https://lottiefiles.com/featured
                        source={require('./assets/animation_lnz5i3ec.json')}
                    />
                </View>
            )}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
    },
    bottle: {
        width: 150,
        height: 300,
        backgroundColor: 'transparent',
    },
    bottleImage: {
        width: 150,
        height: 300,
    },
});

export default FizzlingBottle;
