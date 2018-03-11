import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator,  } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons'
import DeckListView from '../src/Views/DeckListView';
import IndividualDeckView from '../src/Views/IndividualDeckView';
import NewDeckView from '../src/Views/NewDeckView';
import NewQuestionView from '../src/Views/NewQuestionView';
import QuizView from '../src/Views/QuizView';

const Tabs = TabNavigator({
        DeckListView: {
            screen: DeckListView,
            navigationOptions: {
                tabBarLabel: 'Decks',
                tabBarIcon: ({ tintColor }) => <Ionicons name='ios-list-box' size={30} color={tintColor} />
            },
        },
        NewDeck: {
            screen: NewDeckView,
            navigationOptions: {
                tabBarLabel: 'New Deck',
                tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add' size={30} color={tintColor} />
            },
        },
    }, 
    {
        navigationOptions: {
            headerTintColor: "white",
            headerStyle: {
                backgroundColor: "purple",
            }
        },
        tabBarOptions: {
            activeTintColor: "purple",
            style: {
                height: 56,
                backgroundColor: "white",
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }
    });

const MainNavigator = StackNavigator({
        Home: {
            screen : Tabs,
        },
        IndividualDeckView: {
            screen: IndividualDeckView,
        },
        NewQuestionView: {
            screen: NewQuestionView,
        },
        QuizView: {
            screen: QuizView,
        }
    },
    {
        navigationOptions:{
            headerTintColor: "white",
            headerStyle: {
                backgroundColor: "purple",
                height:30,
            } 
        }
    });

export default MainNavigator;