import React, { Component } from 'react';
import { 
    StyleSheet, Text, View, StatusBar
} from 'react-native';

import MainNavigator from './src/MainNavigator';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/Reducers';
import { Constants } from 'expo';
import { setLocalNotification } from './src/utils/api';
   
function UdaciStatusBar ({backgroundColor, ...props}) {
    return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
    )
  }

export default class App extends Component {
    
    componentDidMount() {
        setLocalNotification()
    }
    
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <UdaciStatusBar backgroundColor={"purple"} barStyle="light-content" />
                    <MainNavigator />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
