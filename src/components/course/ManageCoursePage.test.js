import { connect, Provider } from "react-redux";
import * as actions from "../../actions/courseActions"
import configureMockStore from 'redux-mock-store'
// import { createMockStore } from "redux-test-utils";
import React from "react";
import nock from 'nock'
import { shallowWithStore } from "enzyme-redux";
import { mount } from "enzyme"
import thunk from 'redux-thunk'
import renderer from 'react-test-renderer'
import ManageCoursePage from "./ManageCoursePage";
import courseReducer from "../../reducers/courseReducer";

describe("ManageCoursePage", () => {

    it("should render properly", () => {
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);

        const firstCourse =  {
            id: "architecture",
            title: "Architecting Applications for the Real World",
            watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
            authorId: "cory-house",
            length: "2:52",
            category: "Software Architecture"
        };
        const expectedState = { authors: ["Cory House"], courses: [firstCourse], numAjaxCallsInProgress: 0};
        const mapStateToProps = (state) => ({
            state,
          });
        const ConnectedManageCoursePage = connect(mapStateToProps)(ManageCoursePage);

        const wrapper = renderer.create(
          <Provider store={mockStore(expectedState)}>
              <ConnectedManageCoursePage params={"architecture"}/>
              {/* need to add in "ownProps" here that don't come from state */}
          </Provider>,
        ).toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    it("should have the correct default props from state", () => {
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);
        const expectedState =  { authors: [], courses: [], numAjaxCallsInProgress: 0};
        const mapStateToProps = (state) => ({
            state,
        });
        const ConnectedManageCoursePage = connect(mapStateToProps)(ManageCoursePage);
        const component = shallowWithStore(<ConnectedManageCoursePage />, mockStore(expectedState));
        expect(component.props().state).toBe(expectedState);
    });

    it("should dispatch the correct actions when saving a course", () => {
        const middlewares = [thunk];
        const mockStore = configureMockStore(middlewares);

        const firstCourse =  {
            id: "architecture",
            title: "Architecting Applications for the Real World",
            watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
            authorId: "cory-house",
            length: "2:52",
            category: "Software Architecture"
        };
        const expectedState = { authors: ["Cory House"], courses: [firstCourse], numAjaxCallsInProgress: 0};
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

        const store = mockStore(expectedState);
        const ConnectedManageCoursePage = connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
        const component = shallowWithStore(<ConnectedManageCoursePage />, store);

        return store.dispatch(actions.saveCourse(secondCourse)).then(() => {
            // need to do this because we're dispatching async actions using thunk
            const actualActions = store.getActions().map(action => action.type)
            expect(actualActions).toEqual(expectedActions);
        })
    })
  });
