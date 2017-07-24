import * as types from "./actionTypes";

export function createCourse(course) {
    return { type: types.CREATE_COURSE, course };
}
// this is an action creator, an optional function that returns an action
// actions have a type and some data to pass along to the reducer