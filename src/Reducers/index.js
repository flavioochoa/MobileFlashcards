import { GET_DECKS, ADD_DECK, GET_CARDS, ADD_CARD, 
    UPDATE_CURRENT_QUIZ, NEW_QUIZ, SET_STATE } from '../Actions/Types'
import { setFullData } from '../utils/api';


function reducer(state={}, action) {
    switch(action.type) {
        case SET_STATE:
            return action.state;
        case ADD_DECK:
            return _addDeck(state, action);
        case ADD_CARD:
            return _addCard(state, action);
        case UPDATE_CURRENT_QUIZ:
            return _updateCurrentQuiz(state, action);
        case NEW_QUIZ:
            return _newQuiz(state, action);
        default:
            return state;
    }
}

function _addDeck(state, action) {
    let { title } = action;

    let newState = {
        ...state,
        decks: {
            ...state.decks,
            [title]: {
                title,
                questions: []
            }
        } 
    };
    setFullData(newState)
    return newState;
}

function _addCard(state, action) {
    let { key, question } = action;
    let newState = {
        ...state,
        decks:{
            ...state.decks,
            [key]: {
                ...state.decks[key],
                questions:[...state.decks[key].questions, question]
            }
        }
    };

    setFullData(newState);
    return newState;
}

function _newQuiz(state, action) {
    let { title } = action;
    return {
        ...state,
        currentQuiz: {
            title: title,
            currentQuestion: 0,
            questionTotal: state.decks[title].questions.length,
            correct: 0
        }
    };
}

function _updateCurrentQuiz(state, action) {
    let { data } = action;
    return {
        ...state,
        currentQuiz: {
            ...state.currentQuiz,
            ...data
        }
    };
}




export default reducer;