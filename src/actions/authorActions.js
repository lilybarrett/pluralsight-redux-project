import AuthorApi from "../api/mockAuthorApi";
import * as types from "./actionTypes";

export function loadAuthorsSuccess(authors) {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export default function loadAuthors() {
    return function(dispatch) {
        return AuthorApi.getAllAuthors()
        .then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            throw(error);
        });
    };
}
// this is a thunk -- an action creator that returns a function instead of an action
// loadAuthorsSuccess is an action creator that returns a regular action for when the thunk is successful 
// normally, we'd have an action to account for failure as well, but we're not doing that here for the sake of time