import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class Surveyform extends Component {
  renderFileds() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFileds()}
          <Link
            to={"/surveys"}
            className="btn-flat  left red darken-2 white-text"
          >
            Cancel <i className="material-icons right">cancel</i>
          </Link>
          <button
            className="btn-flat teal darken-2 right white-text"
            type="submit"
          >
            Next <i className="material-icons darken-2 right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  //   Multiple Emails validation
  // if user enter comma after first email then its valid other vise it's not valids emails
  errors.recipients = validateEmails(values.recipients || "");
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value !";
    }
  });

  // ================================
  // Simple Method of input Validation
  // ====================================
  //   if (!values.title) {
  //     errors.title = "Title of Survey is requried!";
  //   }
  //   if (!values.body) {
  //     errors.body = "Body of the Survey is required!";
  //   }
  //   if (!values.subject) {
  //     errors.subject = "Subject of the Survey is required!";
  //   }
  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(Surveyform);
