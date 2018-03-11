import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { update_current_quiz } from '../Actions/';
import Card from '../Components/Card';
import Button from '../Components/Button';
import { clearLocalNotification, setLocalNotification } from '../utils/api';

class QuizView extends Component {
    
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title
        }
    }

    state = {
        showAnswer: false,
    }

    render() {
        
        let { currentQuestion, questionTotal, correct } = this.props.currentQuiz;
        
        if(currentQuestion == questionTotal) {
            return(
                <View style={{flex:1}} behavior="padding">
                    <View style={styles.container}>
                        <Text style={styles.text}>
                            Percentage correct: { (correct / questionTotal * 100).toFixed(2)} %
                        </Text>
                        <View style={styles.inlineButtons}>
                            <Button text="Restart Quiz"
                                onPress={ this.restart } 
                                style={[styles.button, styles.buttonLeft]}/>
                            <Button text="Back to Deck"
                                onPress={ this.finish } 
                                style={[styles.button, styles.buttonRight]}/>
                        </View>
                    </View>
                </View>
            );
        }

        let { question, answer } = this.props.questions[currentQuestion];
        let { showAnswer } = this.state; 

        return(
            <View style={{flex:1}} behavior="padding">
                <View>
                    <Text style={styles.text}>
                        { currentQuestion + 1 } / { questionTotal } 
                    </Text>
                </View>
                <View style={styles.container}>
                    <Card question={question} answer={answer} showAnswer={showAnswer}/>
                    <View style={{paddingBottom:50}}></View>
                {
                    !showAnswer && 
                    <Button text="Show answer" onPress={ this.showAnswer }/>
                }

                {
                    showAnswer && 
                    <View style={styles.inlineButtons}>
                        <Button text="Incorrect"
                            onPress={ () => this.next(false) } 
                            style={[styles.button, styles.buttonLeft]}/>
                        <Button text="Correct"
                            onPress={ () => this.next(true) } 
                            style={[styles.button, styles.buttonRight]}/>
                    </View>
                }
                </View>
            </View>
        );
    }

    next = (isCorrect) => {
        this.setState({showAnswer:false})
        let { currentQuiz, update_current_quiz, questions } = this.props;
        let { currentQuestion, questionTotal, correct } = currentQuiz;
        
        if (isCorrect){
            correct+=1;
        }

        currentQuestion+=1;
        let data = {
            currentQuestion,
            correct
        }
        update_current_quiz(data);
    }

    finish = () => {
        this.props.navigation.goBack();
        clearLocalNotification()
            .then(setLocalNotification)
    }

    restart = () => {
        let data = {
            currentQuestion: 0,
            correct: 0,
        }
        this.props.update_current_quiz(data);
        clearLocalNotification()
            .then(setLocalNotification)
    }

    showAnswer = () => {
        this.setState({showAnswer: !this.state.showAnswer})
    }
}

const mapstateToProps = state => {
    return {
        currentQuiz: state.currentQuiz,
        questions: state.decks[state.currentQuiz.title].questions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update_current_quiz(data) {
            dispatch(update_current_quiz(data))
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:25,
        backgroundColor:"#ecf0f1"
    },
    input:{
        width:200,
        height:44,
        padding:8,
        borderWidth:1,
        borderColor:"#757575",
        margin:50,
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
    },
    text:{fontSize:23, fontWeight:"bold",}
});

export default connect(mapstateToProps, mapDispatchToProps)(QuizView);