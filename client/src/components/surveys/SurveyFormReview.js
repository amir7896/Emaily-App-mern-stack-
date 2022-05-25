// SurveyFormReview Shows users the input of there forms .!
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";

import * as actions from "../../actions";
import _ from "lodash";

// history is used to navigate to the dashboard page after
// when user successfully submit the survey..

export const SurveyFormReview = ({
  onCancel,
  formValues,
  submitSurvey,
  history,
}) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });
  return (
    <>
      <div>
        <h5>Please Confirm Your's Enteries Before Submit!</h5>
        {reviewFields}
        <button
          className="yellow darken-3 btn btn-flat  white-text"
          onClick={onCancel}
        >
          Back <i className="material-icons left">arrow_back</i>
        </button>
        <button
          onClick={() => submitSurvey(formValues, history)}
          className="btn btn-flat green darken-3 right white-text"
        >
          Send Survey <i className="material-icons right">email</i>
        </button>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
