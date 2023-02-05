import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFormValues } from "../../reducers/surveyFormReducer";
import { setAuth } from "../../reducers/authReducer";
import axios from "axios";
import NewSurvey from "./NewSurvey";
import ReviewSurvey from "./ReviewSurvey";

export default function SurveyForm() {
  let [page, setPage] = useState(1);
  let [sendingSurvey, setSendingSurvey] = useState(true);
  const formValues = useSelector((state) => state.surveyForm.value);
  const dispatch = useDispatch();
  const HEADERS = [
    "",
    "Fill the form to create a new survey",
    "Almost there, make sure to review form",
    "Sending......",
  ];

  function pageNext() {
    setPage((previousPage) => Math.min(3, previousPage + 1));
  }

  function pagePrevious() {
    setPage((previousPage) => Math.max(1, previousPage - 1));
  }

  async function sendSurvey() {
    pageNext();
    const response = await axios.post("/api/survey", formValues);
    dispatch(setAuth(response.data));
    setSendingSurvey(false);
  }

  useEffect(() => {
    return () => {
      // Clear the form values from redux on component unmount
      dispatch(
        setFormValues({
          title: "",
          subject: "",
          body: "",
          recipients: "",
        })
      );
    };
  }, [dispatch]);

  return (
    <div className="border-primary dark:border-secondary rounded-xl border-2 p-4">
      <span className="badge border-primary dark:border-secondary text-primary dark:text-secondary badge-lg badge-outline px-4 py-3">
        {HEADERS[page]}
      </span>

      <progress
        className="progress progress-primary dark:progress-secondary w-full px-5 mt-5"
        value={page}
        max="3"
      />

      {page === 1 && <NewSurvey pageNext={pageNext} />}
      {page === 2 && (
        <ReviewSurvey pagePrevious={pagePrevious} sendSurvey={sendSurvey} />
      )}

      {page === 3 && (
        <div className="flex flex-col">
          {sendingSurvey && (
            <div className="mx-auto mt-10">
              <h3 className="text-center">📤 Your survey is being sent </h3>
              <progress className="progress progress-success w-full my-10"></progress>
            </div>
          )}

          {!sendingSurvey && (
            <div className="mx-auto mt-10">
              <h3 className="text-center">Survey sent out successfully</h3>
            </div>
          )}

          <div className="flex justify-center">
            <Link to="/surveys">
              <button className="btn btn-active my-10" disabled={sendingSurvey}>
                Return to Dashboard
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
