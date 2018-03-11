import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

class Card extends Component {

    componentWillMount() { //based on https://github.com/browniefed/examples/blob/animated_basic/flip/animatedbasic/index.android.js
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
          this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg']
        })
    }
    
    componentWillReceiveProps(nextProps) {
        this.flipCard();
    }


    flipCard() {
        if (this.value >= 90) {
            Animated.spring(this.animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        } else {
            Animated.spring(this.animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }
    }


    render() {
        const frontAnimatedStyle = {
            transform: [
                { rotateY: this.frontInterpolate}
            ]
        };
        const backAnimatedStyle = {
            transform: [
                { rotateY: this.backInterpolate }
            ]
        };
        let { showAnswer, answer, question } = this.props;
        
        return (
            <View style={styles.container}>
            {
                !showAnswer && 
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                        <View>
                            <Text style={styles.question}> { question } </Text>
                        </View>
                    </Animated.View>
            }
            {
                showAnswer && 
                    <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                        <View>
                            <Text style={styles.question}> The answer is:  </Text>
                            <View style={styles.addPadding}></View>
                            <Text style={styles.question}> { answer } </Text>
                        </View>
                    </Animated.View>
            }
            </View>
        );
    }
} 


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    flipCard: {
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: 'hidden',
        alignItems: 'center',
        paddingTop:20,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        paddingBottom:20,
        marginBottom:15,
        backgroundColor: '#9370DB',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.5,
    },
    flipCardBack: {
        backgroundColor:"#4B0082"
    },
    question:{
        fontSize:23,
        fontWeight:"bold",
        color:"white"
    },
    addPadding:{
        paddingBottom:25,
    }
});

export default Card;