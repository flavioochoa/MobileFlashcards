import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
    KeyboardAvoidingView, Keyboard, TextInput, Alert
} from 'react-native';
import { connect } from 'react-redux';
import { add_card } from '../Actions/';
import Button from '../Components/Button';

class NewQuestionView extends Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params;
        return {
            title
        }
    }

    state = {
        question: '',
        answer: ''
    }

    render() {
        return(
            <KeyboardAvoidingView style={styles.parentContainer} behavior="padding">
                <View style={styles.childContainer}>
                    <TextInput 
                        style={styles.input} 
                        value={this.state.question}
                        onChangeText={(question) => this.setState({question})}
                        placeholder="Question"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={true}
                    />
                </View>
                <View style={styles.childContainer}>
                    <TextInput 
                        style={styles.input} 
                        value={this.state.answer}
                        onChangeText={(answer) => this.setState({answer})}
                        placeholder="Answer"
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={true}
                    />
                </View>
                <View style={[styles.childContainer]}>
                    <View style={{flex:.8}}>
                        <Button onPress={this.saveQuestion} text="Save Card"/>
                    </View>
                </View>
                <View style={{ height: 150 }} />
            </KeyboardAvoidingView>
        );
    }

    saveQuestion = () => {
        if(!this.state.question || !this.state.answer) {
            Alert.alert(
                'All fields are required!'
            );
            return;
        }
        let { navigation, add_card } = this.props;
        add_card(navigation.getParam("key"), this.state);
        Alert.alert(
            'Save successfully',
            '',
            [
                {text: 'OK', onPress: () => navigation.goBack()},
            ],
            { cancelable: false }
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    parentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:25,
        backgroundColor:"#ecf0f1"
    },
    childContainer:{
        paddingTop:25,
        flexDirection:'row',
        paddingBottom:25,
    },
    input:{
        flex:.8,
        padding:8,
        borderWidth:1,
        borderColor:"#757575",
    },
});


const mapDispatchToProps = dispatch => {
    return {
        add_card(key, card){
            dispatch(add_card(key, card));
        }
    }
}

export default connect(null, mapDispatchToProps)(NewQuestionView);