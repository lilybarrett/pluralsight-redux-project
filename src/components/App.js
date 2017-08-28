import React, { PropTypes } from 'react';
import Header from './common/Header';
import { connect } from "react-redux";
import initialState from "../reducers/initialState";

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header
                    loading={this.props.loading}
                />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
    // an object type is required for these props
};

function mapStateToProps(state = initialState, ownProps) {
    // maps the state in the Redux store to our component :)
    return {
        loading: state.ajaxCallsInProgress > 0
    };
}

export default connect(mapStateToProps)(App);
