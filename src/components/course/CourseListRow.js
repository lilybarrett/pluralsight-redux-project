import React, { PropTypes } from "react";
import { Link } from "react-router";
import * as courseActions from "../../actions/courseActions";

const CourseListRow = ({ course, actions }) => {
    return (
        <tr>
            <td><a href={course.watchHref} target="_blank">Watch</a></td>
            <td><Link to={`/course/${course.id}`}>{course.title}</Link></td>
            <td>{course.authorId}</td>
            <td>{course.category}</td>
            <td>{course.length}</td>
            <td onClick={() => actions.deleteCourse(course)}><a href="#">Delete</a></td>
        </tr>
    );
};

CourseListRow.propTypes = {
    course: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default CourseListRow;