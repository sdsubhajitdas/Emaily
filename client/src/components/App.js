import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../reducers/authReducer";
import axios from "axios";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyForm from "./surveys/SurveyForm";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/api/current_user").then((response) => {
      dispatch(setAuth(response.data));
    });
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <BrowserRouter>
        <div>
          <Header />
          <div className="my-12 mx-3">
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyForm} />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
