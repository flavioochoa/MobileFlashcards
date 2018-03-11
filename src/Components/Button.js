import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const Button = ({text, onPress, style}) => {
    return (
        <TouchableOpacity
            style={style ? style: styles.button}
            onPress={onPress}
        >
            <Text>{text}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#CCC8C8',
        padding: 10,
        borderRadius: 5,
    },
});

export default Button;