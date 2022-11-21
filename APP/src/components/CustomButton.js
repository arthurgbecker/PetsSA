import {Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

const CustomButton = ({ onPress, text }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>
                {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#AFF4D4',
        width: '100%',
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    
    text: {
        padding: 15,
        fontWeight: 'bold',
        color: '#4536E3',
    }
})

export default CustomButton;
