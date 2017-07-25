import "babel-polyfill";
import React from 'react';
import { render } from "react-dom";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
// Provider is a higher-order component that attaches our store to our React container components
import { Router, browserHistory } from "react-router";
import routes from "./routes";
import "./styles/styles.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import loadCourses from "./actions/courseActions";
import loadAuthors from "./actions/authorActions";

const store = configureStore();
// we don't pass in an argument here, because our reducers (i.e., courseReducer.js) will set the default arguments via the rootReducer
// if we passed in an argument, we'd override the state set by our reducers -- useful when we may want to rehydrate our app's state, facilitate server-side rendering, etc.

store.dispatch(loadAuthors());
// load authors when we boot up the app

store.dispatch(loadCourses());
// load courses when we boot up the app

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById("app")
);
