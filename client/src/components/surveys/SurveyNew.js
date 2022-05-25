// SurveyNew ShowsSurvey Form and SurveyReviewForm ....
import React, { Component } from "react";
import { reduxForm } from "redux-form";

import Surveyform from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class Surveynew extends Component {
  // Component Level State Initialization .....
  state = { showFormReview: false };

  // Rendering Content on different Conditions ..
  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <Surveyform
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return (
      <>
        <div>{this.renderContent()}</div>
      </>
    );
  }
}

export default reduxForm({
  form: "surveyForm",
})(Surveynew);
