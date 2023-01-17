import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../reducers/authReducer";
import axios from "axios";

import Header from "./Header";
import Landing from "./Landing";

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
          <Route exact path="/" component={Landing} />
        </div>
      </BrowserRouter>
    </div>
  );
}
