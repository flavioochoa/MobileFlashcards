import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Deck from '../Components/Deck';
import { get_data, set_state } from '../Actions';
import { connect } from 'react-redux';
import { setFullData, getFullData } from '../utils/api';


class DeckListView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Deck List"
        }
    }
    componentDidMount() {
        setFullData()
        .then(()=>{
            getFullData()
            .then((results) => {
                const data = JSON.parse(results);
                this.props.set_state(data);
            });
        })
    }
    
    render() {
        return(
            <View style={styles.parentContainer}>
                <View style={{paddingBottom:10}}></View>
                <FlatList
                    style={styles.container}
                    data={this.props.decks}
                    renderItem={this.renderItem}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        );
    }

    renderItem = ({index, item}) => {
        return(
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate(
                    'IndividualDeckView',
                    { title: item.title }
                )}
            >
                <Deck 
                    title={item.title} 
                    cardNumber={item.questionNumber}
                />
            </TouchableOpacity>
        )
    }

    _keyExtractor = (item, index) => index
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    parentContainer:{
        flex: 1,
        justifyContent: 'center',
        paddingTop:10,
        backgroundColor:"#ecf0f1",
    },

});

const mapStateToProps = (state) => {
    return {
        decks: getParsedData(state.decks)
    }
}

const mapDispatchToPros = dispatch => {
    return {
        set_state(state) {
            dispatch(set_state(state))
        }
    }
}

const getParsedData = state => {
    if(state)
        return Object.keys(state).map((key)=>{
            let aux = state[key];
            let obj = {
                title: aux.title,
                questionNumber:aux.questions.length,
            };
            return obj;
        });
    return [];
}


export default connect(mapStateToProps, mapDispatchToPros)(DeckListView);