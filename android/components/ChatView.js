import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';



const ChatView = ({navigation}) => {
    const welcomeTextRef = useRef(null);

    useEffect(() => {
        if (welcomeTextRef.current) {
            // Animate the welcome text when the component mounts
            welcomeTextRef.current.fadeInDown(2000); // You can adjust the duration as needed
        }
    }, []);
    return (
        <ImageBackground
            source={require('./cardano-blockchain-platform.jpg')} // Replace with your background image
            style={styles.backgroundImage}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Animatable.Text
                        ref={welcomeTextRef}
                        style={styles.welcomeText}
                    >
                        Welcome to Tech Mate
                    </Animatable.Text>
                    <Text style={styles.descriptionText}>
                        Engage in meaningful conversations with our AI assistant.
                    </Text>
                    <TouchableOpacity
                        style={styles.startButton}
                        onPress={() => navigation.navigate('ChatScreen')} // Replace with your chat screen name
                    >
                        <Text style={styles.buttonText}>
                            Start 
                            
                        </Text>

                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
};


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    descriptionText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    startButton: {
        backgroundColor: '#0bc3c8',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    buttonText: {
        color: '#131717',
        fontSize: 20,
        fontWeight: 'bold',

    },
});

export default ChatView;