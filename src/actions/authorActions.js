import AuthorApi from "../api/mockAuthorApi";
import * as types from "./actionTypes";
import { beginAjaxCall } from "./ajaxStatusActions";

export function loadAuthorsSuccess(authors) {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export default function loadAuthors() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        // Advantages of putting dispatch inside this thunk and NOT in the mock API call (though the latter would certainly centralize this dispatch):
        // Ups the speed of the UI response (we don't have to wait for the API call to finish) -- "optimistic update"
        // Allows us control over which thunks make use of the preloader and which ones don't
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