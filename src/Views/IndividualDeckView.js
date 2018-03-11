import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Deck from '../Components/Deck';
import Button from '../Components/Button';
import { new_quiz } from '../Actions/';

class IndividualDeckView extends Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title
        }
    }
    
    render() {
        let { title, questions } = this.props.deck
        return (
            <View style={styles.container}>
                <Deck title={title} cardNumber={questions.length}/>
                <View style={styles.separator}></View>
                <View style={styles.inlineButtons}>
                    <Button text="Add Card"
                        onPress={ this.addCard } 
                        style={[styles.button, styles.buttonLeft]}/>
                    <Button text="Start Quiz"
                        onPress={ this.startQuiz } 
                        style={[styles.button, styles.buttonRight]}/>
                </View>
            </View>
        )
    }

    addCard = () => {
        let { navigation, deck } = this.props;
        navigation.navigate(
            'NewQuestionView',
            { title: `Add Card to ${deck.title} Deck`, key:deck.title}
        );
    }

    startQuiz = () => {
        let { navigation, deck, new_quiz } = this.props;
        if(deck.questions.length == 0) {
            Alert.alert(
                "Can't start Quiz!",
                'Add at least one card',
                [
                    {
                        text: 'OK', 
                        onPress: () => { 
                        }
                        
                    },
                ],
                { cancelable: false }
            );
        } else {
            navigation.navigate(
                `QuizView`,
                { title: `Quiz of ${deck.title}`, key:deck.title }
            )
            new_quiz(deck.title);
        }
    }

}

const mapStateToProps = (state, ownProps) => {
    const { title } = ownProps.navigation.state.params
    return {
        deck: getParsedData(state.decks, title),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        new_quiz(title) {
            dispatch(new_quiz(title));
        }
    }
}

const getParsedData = (state, title) => {
    return state[title];
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:10,
        backgroundColor:"#ecf0f1",
        justifyContent: 'center',
    },
    separator: {
        paddingTop: 10,
    },
    inlineButtons: {
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#CCC8C8',
        padding: 10,
        flex:1,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonRight:{ 
        marginLeft: 5,
    },
    buttonLeft:{
        marginRight: 5,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(IndividualDeckView);