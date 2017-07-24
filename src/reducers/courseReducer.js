import * as types from "../actions/actionTypes";

export default function courseReducer(state = [], action) {
    // state is an array because we want to be able to collect/list all the different courses
    switch(action.type) {
        case "CREATE_COURSE":
            return [...state, Object.assign({}, action.course)];
             // takes the data sent through the action
             // creates a new course object with Object.assign({}, action.course)
             // uses spread operator to return a copy of the state with the new data (in line with immutability principle)
        default: 
            return state;
    }
}