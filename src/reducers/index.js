// this is the root reducer file -- it's typically called index.js
import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";

const rootReducer = combineReducers({
    courses,
    authors 
    // shorthand property name -- in ES6, when the right-hand side matches the left-hand side, we can omit the latter. 
    // otherwise would be courses: courses
});

export default rootReducer;