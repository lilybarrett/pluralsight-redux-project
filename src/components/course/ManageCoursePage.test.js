import { connect, Provider } from "react-redux";
import * as actions from "../../actions/courseActions"
import * as types from "../../actions/actionTypes";
import configureMockStore from 'redux-mock-store'
// import { createMockStore } from "redux-test-utils";
// this worked fine and had lots of handy helper methods, but I couldn't integrate the thunk middleware.
import React from "react";
import { shallowWithStore } from "enzyme-redux";
import { mount } from "enzyme"
import thunk from 'redux-thunk'
import renderer from 'react-test-renderer'
import ManageCoursePage from "./ManageCoursePage";
import courseReducer from "../../reducers/courseReducer";

describe("ManageCoursePage", () => {
    let mockStore;

    beforeEach(() => {
        const middlewares = [thunk];
        mockStore = configureMockStore(middlewares);
    })

    it("should render properly", () => {
        const firstCourse =  {
            id: "architecture",
            title: "Architecting Applications for the Real World",
            watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
            authorId: "cory-house",
            length: "2:52",
            category: "Software Architecture"
        };
        const initialState = { authors: ["Cory House"], courses: [firstCourse], numAjaxCallsInProgress: 0};
        const mapStateToProps = (state) => ({
            state,
          });
        const ConnectedManageCoursePage = connect(mapStateToProps)(ManageCoursePage);

        const wrapper = renderer.create(
          <Provider store={mockStore(initialState)}>
              <ConnectedManageCoursePage params={"architecture"}/>
              {/* need to add in "ownProps" here that don't come from state */}
              {/* still seeing a weird error about keys being missing, but the test passes, so... */}
          </Provider>,
        ).toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    it("should have the correct default props from state", () => {
        const initialState =  { authors: [], courses: [], numAjaxCallsInProgress: 0};
        const mapStateToProps = (state) => ({
            state,
        });
        const ConnectedManageCoursePage = connect(mapStateToProps)(ManageCoursePage);
        const component = shallowWithStore(<ConnectedManageCoursePage />, mockStore(initialState));
        expect(component.props().state).toBe(initialState);
    });
    // if we want to see how this affects the appearance of things on the page, it would probably make sense to move that stuff to an integration test.

    it("should dispatch the correct actions when saving a course", () => {
        const firstCourse =  {
            id: "architecture",
            title: "Architecting Applications for the Real World",
            watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
            authorId: "cory-house",
            length: "2:52",
            category: "Software Architecture"
        };
        const initialState = { authors: ["Cory House"], courses: [firstCourse], numAjaxCallsInProgress: 0};
        const mapStateToProps = (state) => ({
            state,
          });

        const secondCourse = {
            id: "career-reboot-for-developer-mind",
            title: "Becoming an Outlier: Reprogramming the Developer Mind",
            watchHref: "http://www.pluralsight.com/courses/career-reboot-for-developer-mind",
            authorId: "cory-house",
            length: "2:30",
            category: "Career"
        }

        const expectedActions = [
            "BEGIN_AJAX_CALL",
            "UPDATE_COURSE_SUCCESS"
        ];

        const mapDispatchToProps = (dispatch) => ({
            saveCourse(course) {
                dispatch(action);
            },
        });

        const store = mockStore(initialState);
        const ConnectedManageCoursePage = connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
        const component = shallowWithStore(<ConnectedManageCoursePage />, store);

        return store.dispatch(actions.saveCourse(secondCourse)).then(() => {
            // we can change this to use async/await
            // need to do this because we're dispatching async actions using thunk
            const actualActions = store.getActions().map(action => action.type)
           // note: redux-mock-store only stores changes to actions, not the state.
            expect(actualActions).toEqual(expectedActions);
        });
    });

    it("should have the correct output via the reducer", () => {
        // we don't need to mount a component for this to take place --
        // after all, a reducer is just a pure function.
        // so we just test the input and output.
        const firstCourse =  {
            id: "architecture",
            title: "Architecting Applications for the Real World",
            watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
            authorId: "cory-house",
            length: "2:52",
            category: "Software Architecture"
        };
        const initialState = [firstCourse];
        const course = {
            id: "career-reboot-for-developer-mind",
            title: "Becoming an Outlier: Reprogramming the Developer Mind",
            watchHref: "http://www.pluralsight.com/courses/career-reboot-for-developer-mind",
            authorId: "cory-house",
            length: "2:30",
            category: "Career"
        }
        const action = {
            type: types.CREATE_COURSE_SUCCESS,
            course: course
        }
        const nextState = courseReducer(initialState, action);
        expect(nextState).toEqual([ { id: 'architecture',
            title: 'Architecting Applications for the Real World',
            watchHref: 'http://www.pluralsight.com/courses/architecting-applications-dotnet',
            authorId: 'cory-house',
            length: '2:52',
            category: 'Software Architecture' },
            { id: 'career-reboot-for-developer-mind',
            title: 'Becoming an Outlier: Reprogramming the Developer Mind',
            watchHref: 'http://www.pluralsight.com/courses/career-reboot-for-developer-mind',
            authorId: 'cory-house',
            length: '2:30',
            category: 'Career' } ])
        })
  });
