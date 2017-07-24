import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actions/courseActions";

class CoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: { title: "" }
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({course: course});
  }

 onClickSave() {
    this.props.actions.createCourse(this.state.course);
  }
 
  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
          {this.props.courses.map(this.courseRow)}  
        <h2>Add Course</h2>
        <input
          type="text"
          onChange={this.onTitleChange}
          value={this.state.course.title}
        />

        <input 
          type="submit"
          value="Save"
          onClick={this.onClickSave}
        />
      </div>
    );
  }
}

CoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// requiring dispatch and courses as propTypes on our course page -- prevent linting errors we'd see otherewise 

function mapStateToProps(state, ownProps) {
  // the state here represents the state within our Redux store
  // ownProps references the component's own props -- i.e., routing-related props injected by React Router
  return {
    courses: state.courses 
    // this accesses the courses data within our Redux store 
    // the "courses" name here is the same as how we defined it within our rootReducer 
  };
  // define an object that returns the properties we'd like to see exposed on our component
  // by including courses here, I'm saying I'd like to be able to access my courses by saying this.props.courses from within my component
}

function mapDispatchToProps(dispatch) {
  // dispatch will get injected in by the Connect function 
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}
// decides which actions you want to expose on your component
// dispatch is a function that allows you to fire off your actions
// wrap our action creators in a call to dispatch

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
// the higher-order Connect function is what we use to create components that can interact with Redux -- container components
// export the CoursesPage wrapped in a call to Connect 

// what's going on with the double set of parentheses here? Well...
// this is just two function calls. the Connect function ends up returning a function,
// which immediately calls our container component, CoursesPage, with the result of the first function.

// it's the same as:
// const connectStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(CoursesPage);
