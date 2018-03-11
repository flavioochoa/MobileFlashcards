import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, 
    KeyboardAvoidingView, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback  } from 'react-native'
import { connect } from 'react-redux';
import { add_deck } from '../Actions';
import Button from '../Components/Button';

class NewDeckView extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: "New Deck"
        }
    }

    constructor(props) {
        super(props);
        this.state = { title: '' };
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.parentContainer} behavior="padding">
                <Text style={styles.question}>What is the title of you new deck?</Text>

                <View style={styles.childContainer}>
                    <TextInput 
                        style={styles.input} 
                        value={this.state.title}
                        onChangeText={(title) => this.setState({title})}
                        placeholder="Title of the deck"
                        blurOnSubmit={true}
         
                        onBlur={()=>{
                             console.log("blur");
                            Keyboard.dismiss()
                         }}
                         onEndEditing={()=>{
                            console.log("onEndEditing");
                            Keyboard.dismiss()
                         }}
                         onSubmitEditing = { () =>{
                            console.log("onSubmitEditing");
                            Keyboard.dismiss()
                         }

                         }
                         returnKeyType={ "done" }
                    />
                </View>
                <View style={[styles.childContainer]}>
                    <View style={{flex:.8}}>
                        <Button onPress={this.saveDeck} text="Create Deck"/>
                    </View>
                </View>
                
            </KeyboardAvoidingView>
        )
    }

    saveDeck = () => {
        if(!this.state.title) {
            Alert.alert(
                'Type a name for your new deck'
            );
            return;
        }

        let { navigation, add_deck } = this.props;
        
        add_deck(this.state.title);

        var fn = () => { //I do not know why input is focused after click in OK
                        // I was no able to dismiss the keyboard
            let{ title } = this.state;
            this.setState({title:""})
            Keyboard.dismiss();
            navigation.goBack(); // I do not know how to override goback function in
            navigation.navigate( //  IndividualDeckView for return to main list
                'IndividualDeckView',
                { 
                    title, 
                },
            );
        }

        Alert.alert(
            'Save successfully',
            '',
            [
                {text: 'OK', onPress: () => fn()}
            ]
        );
    }
}

const styles = StyleSheet.create({
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
    question: {
        fontSize:23,
        fontWeight:"bold",
    }
});

const mapDispatchToProps = dispatch => {
    return {
        add_deck(title){
            return dispatch(add_deck(title));
        }
    }
}


export default connect(null, mapDispatchToProps)(NewDeckView);