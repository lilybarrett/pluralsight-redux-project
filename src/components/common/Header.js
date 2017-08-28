import React, { PropTypes } from "react";
import { Link, IndexLink } from "react-router";
import LoadingDots from "./LoadingDots";

const Header = ({loading}) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>
      {" | "}
      <Link to="/courses" activeClassName="active">Courses</Link>
      { loading && <LoadingDots interval={100} dots={20}/> }
      {/* the right-hand side -- the LoadingDots component -- will only evaluate if the left-hand side -- loading -- is true */}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
}

export default Header;
