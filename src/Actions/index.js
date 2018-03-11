import * as types from './Types.js';


export function get_decks() {
    return {
        type: types.GET_DECKS,
    }
}

export function add_deck(title) {
    return {
        type: types.ADD_DECK,
        title
    }
}

export function get_cards(key) {
    return {
        type: types.GET_CARDS,
        key,
    }
}

export function add_card(key, question) {
    return {
        type: types.ADD_CARD,
        key,
        question
    }
}

export function update_current_quiz(data) {
    return {
        type: types.UPDATE_CURRENT_QUIZ,
        data
    }
}

export function new_quiz(title){
    return {
        type: types.NEW_QUIZ, 
        title,
    }
}

export function set_state(state) {
    return {
        type: types.SET_STATE,
        state
    }
}