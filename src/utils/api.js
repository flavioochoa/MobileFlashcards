import { AsyncStorage } from 'react-native'
import { API_KEY, NOTIFICATION_KEY } from '../Actions/Types';
import { Notifications, Permissions } from 'expo';

export function addDeck ({ entry, key }) {
  return AsyncStorage.mergeItem(API_KEY, JSON.stringify({
    [key]: entry
  }))
}


export function getFullData() {
    return AsyncStorage.getItem(API_KEY);
}

export function setFullData(state={}) {
    //AsyncStorage.removeItem(API_KEY); //for restart data 
    AsyncStorage.getItem(NOTIFICATION_KEY);
    if(Object.keys(state).length) {
        AsyncStorage.setItem(API_KEY, JSON.stringify(state))
    } else {
        return AsyncStorage.getItem(API_KEY)
        .then(results => {
            results == null ?
                AsyncStorage.setItem(API_KEY, JSON.stringify(initialState)): "" ;
        })
    }
    
} 
//Notification code From react nanodegree

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: "UdaciCards Remainder",
        body: "Remember to solve a quiz at least once a day",
        ios: {
            sound: true,
        },
            android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification () { 
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
                if (status === 'granted') {
                    Notifications.cancelAllScheduledNotificationsAsync()
    
                    let tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate()+1)
                    tomorrow.setHours(20)
                    tomorrow.setMinutes(0)
    
                    Notifications.scheduleLocalNotificationAsync(
                        createNotification(),
                        {
                            time: tomorrow,
                            repeat: 'day',
                        }
                    )
    
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              }
            });
        }
    })
}

const initialState = {
    decks: {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        },
        Random : {
            title: 'Random',
            questions: [
                {
                    question: 'Is my name Flavio?',
                    answer: "Yes!",
                },
                {
                    question: 'Are Mexican tacos the best in the world?',
                    answer: "Obviously"
                }
            ],
        }
    },
    currentQuiz: {
        title: null,
        currentQuestion: 0,
        questionTotal: 0,
        correct: 0,
    }
};