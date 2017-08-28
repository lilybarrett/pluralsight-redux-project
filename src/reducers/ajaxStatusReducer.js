import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) === "_SUCCESS";
    // Gives you the last 8 characters of the string representing the name of the type
    // i.e., "LOAD_AUTHORS_SUCCESS", "CREATE_COURSE_SUCCESS"
}

export default function ajaxStatusReducer(state = initialState.numAjaxCallsInProgress, action) {
     // Each of our reducers is just working with a small slice of state -- in this case, the "ajaxCallsInProgress" part of the initial state
    if (action.type === types.BEGIN_AJAX_CALL) {
        return state + 1;
    } else if (action.type === types.AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
        return state - 1;
    } else {
        return state;
    }
}
