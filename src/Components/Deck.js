import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Deck = ({ title, cardNumber }) => {
    return(
        <View style={styles.container}>
            <View >
                <Text style={styles.title}>{title}</Text>
            </View>
            <View>
                <Text style={styles.title}>{cardNumber} Cards</Text>
            </View>
        </View>
    ); 
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop:20,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        paddingBottom:20,
        marginBottom:15,
        backgroundColor: '#7647a2',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.5
    },
    title:{
        color:"white",
        fontSize: 20
    },
});

export default Deck;
