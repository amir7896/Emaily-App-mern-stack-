import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

// Fetching Login User at current time ...
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Adding User Payment detail in DB and also handling Stripe Token...
export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token);
  // exact login User Detail Also Payment detail is included in user model ..
  dispatch({ type: FETCH_USER, payload: res.data });
};

// Sending the new Survey ..
export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/surveys", values);
  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};
// Fetching Current Login User Survey ,..
export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get("/api/surveys");
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
