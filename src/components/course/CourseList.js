import React, { PropTypes } from "react";
import CourseListRow from "./CourseListRow";
import * as courseActions from "../../actions/courseActions";

const CourseList = ({ courses, actions }) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>View</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Length</th>
                <th>Remove</th>
            </tr>
            </thead>
            <tbody>
            {courses.map(course =>
                <CourseListRow key={course.id} course={course} actions={actions} />
            )}
            </tbody>
        </table>
    );
};

CourseList.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

export default CourseList;