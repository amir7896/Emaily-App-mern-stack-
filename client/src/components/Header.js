import React, { Component } from "react";
import { Link } from "react-router-dom";
import Payments from "./Payments";
import { connect } from "react-redux";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return "Deciding";
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );

      default:
        return [
          <li key={1}>
            <Payments />
          </li>,
          <li key={3} style={{ margin: "0 10px" }}>
            {" "}
            Credits : {this.props.auth.credits}
          </li>,
          <li key={2}>
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  }
  render() {
    // console.log(this.props);
    return (
      <>
        <nav>
          <div className="nav-wrapper">
            <Link
              className="left brand-logo"
              to={this.props.auth ? "/surveys" : "/"}
            >
              Emaily
            </Link>
            <ul className="right">{this.renderContent()}</ul>
          </div>
        </nav>
      </>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
