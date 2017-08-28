import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actions/courseActions";
import * as authorActions from "../../actions/authorActions";
import CourseForm from "./CourseForm";
import toastr from "toastr";

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {},
            saving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.course.id !== nextProps.course.id) {
            // Necessary to populate form when existing course is loaded directly
            // Basically informs React whether or not a change has ACTUALLY occurred
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = Object.assign({}, this.state.course);
        course[field] = event.target.value;
        //changes the appearance of the actual field to reflect the user's input
        return this.setState({course: course});
        // return the new state of the course (with the user input)
    }

    saveCourse(event) {
        event.preventDefault();
        this.setState({ saving: true });
        this.props.actions.saveCourse(this.state.course)
            .then(() => this.redirect())
            .catch((error) => {
                toastr.error(error);
                this.setState({ saving: false });
            });
        // we can access the actions from our props because we mapped the dispatch to our props below?
    }

    redirect() {
        this.setState({ saving: false });
        toastr.success("Course saved!");
        this.context.router.push("/courses");
    }

    render() {
        return (
            <div>
                <CourseForm
                    allAuthors={this.props.authors}
                    onSave={this.saveCourse}
                    onChange={this.updateCourseState}
                    course={this.state.course}
                    errors={this.state.errors}
                    saving={this.state.saving}
                />
            </div>
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, id) {
    const course = courses.filter(course => course.id == id);
    if (course.length > 0) return course[0]; //since filter returns an array, get inside and grab the remaining value with bracket notation
    return null;
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id; //from the path "/course/:id"
    let course = {id: " ", watchHref: " ", title: " ", authorId: " ", length: " ", category: " "};

    if (courseId && state.courses.length > 0) {
        // state.courses is coming from our store's state
        course = getCourseById(state.courses, courseId);
    }

    const authorsFormattedForDropdown = state.authors.map(author => {
        return {
            value: author.id,
            text: `${author.firstName} ${author.lastName}`
        };
    });
    return {
        course: course,
        authors: authorsFormattedForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);