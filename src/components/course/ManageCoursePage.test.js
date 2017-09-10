import { connect, Provider } from "react-redux";
import * as actions from "../../actions/courseActions"
import { createMockStore } from "redux-test-utils";
import React from "react";
import nock from 'nock'
import { shallowWithStore } from "enzyme-redux";
import { mount } from "enzyme"
import thunk from 'redux-thunk'
import renderer from 'react-test-renderer'
import ManageCoursePage from "./ManageCoursePage";
import courseReducer from "../../reducers/courseReducer";

describe("ManageCoursePage", () => {

    afterEach(() => {
        nock.cleanAll()
    });

    it("should render properly", () => {
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
          <Provider store={createMockStore(expectedState)}>
              <ConnectedManageCoursePage params={"architecture"}/>
              {/* need to add in "ownProps" that don't come from state */}
          </Provider>,
        ).toJSON();
        expect(wrapper).toMatchSnapshot();
    });

    it("should have the correct default props from state", () => {
      const expectedState =  { authors: [], courses: [], numAjaxCallsInProgress: 0};
      const mapStateToProps = (state) => ({
        state,
      });
      const ConnectedManageCoursePage = connect(mapStateToProps)(ManageCoursePage);
      const component = shallowWithStore(<ConnectedManageCoursePage />, createMockStore(expectedState));
      expect(component.props().state).toBe(expectedState);
    });

    it("should dispatch the correct actions", () => {
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

        const action = {
            type: 'CREATE_COURSE',
            data: secondCourse
        };

        const mapDispatchToProps = (dispatch) => ({
            saveCourse(course) {
                dispatch(action);
            },
        });

        const store = createMockStore(expectedState);
        const ConnectedManageCoursePage = connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
        const component = shallowWithStore(<ConnectedManageCoursePage />, store);

        // return store.dispatch(actions.saveCourse(secondCourse)).then(() => {
        //     console.log(store.getActions());
        // })
        // console.log(store.getActions());
        // expect(store.isActionDispatched(action)).toBe(true);
    })

    // it("should dispatch the correct ASYNC actions, round TWO", () => {

    // })
  });
