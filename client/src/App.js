import "./App.css";
import React, { Component } from "react";
import { Landing } from "./components/Landing";
import { connect } from "react-redux";
import * as actions from "./actions";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Surveynew from "./components/surveys/SurveyNew";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <>
        <div className="container">
          <BrowserRouter>
            <Header />
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/surveys" component={Dashboard}></Route>
            <Route path="/surveys/new" component={Surveynew} />
          </BrowserRouter>
        </div>

        {/* With React router dom v6 */}
        {/* <div className="container">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/surveys" element={<Dashboard />} />
              <Route path="/surveys/new" element={<Surveynew />} />
            </Routes>
          </BrowserRouter>
        </div> */}
      </>
    );
  }
}

export default connect(null, actions)(App);
