import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authorReducer(state = initialState.authors, action) {
    // state is an array because we want to be able to collect/list all the different courses
    switch(action.type) {
        case types.LOAD_AUTHORS_SUCCESS:
            return action.authors;
            // refers to the loadAuthorsSuccess action in our authorActions.js
        default: 
            return state;
    }
}