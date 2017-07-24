import * as types from "./actionTypes";
import courseApi from "../api/mockCourseApi";

export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
}
// this is an action creator, an optional function that returns an action
// actions have a type and some data to pass along to the reducer

export default function loadCourses() {
    return function(dispatch) {
        return courseApi.getAllCourses()
        .then(courses => {
            dispatch(loadCoursesSuccess(courses));
        })
        .catch(error => {
            throw(error);
        });
    };
}