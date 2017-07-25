import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
    // state is an array because we want to be able to collect/list all the different courses
    switch(action.type) {
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;
             // takes the data sent through the action
             // creates a new course object with Object.assign({}, action.course)
             // uses spread operator to return a copy of the state with the new data (in line with immutability principle)
        case types.CREATE_COURSE_SUCCESS:
            return [ ...state, Object.assign({}, action.course) ];
            // will return a new array of courses
        case types.UPDATE_COURSE_SUCCESS:
            return [ ...state.filter(course => course.id !== action.course.id), Object.assign({}, action.course) ];
        default: 
            return state;
    }
}