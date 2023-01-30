import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFormValues } from "../../reducers/surveyFormReducer";
import NewSurvey from "./NewSurvey";
import ReviewSurvey from "./ReviewSurvey";

export default function SurveyForm() {
  let [page, setPage] = useState(1);
  let history = useHistory();
  const dispatch = useDispatch();
  const HEADERS = [
    "",
    "Fill the form to create a new survey",
    "Almost there, make sure to review form",
    "Sending",
  ];

  function pageNext() {
    setPage((previousPage) => Math.min(3, previousPage + 1));
  }

  function pagePrevious() {
    setPage((previousPage) => Math.max(1, previousPage - 1));
  }

  function closeSurvey() {
    // Clear the form values from redux and then navigate to different page
    dispatch(
      setFormValues({
        title: "",
        subject: "",
        body: "",
        recipients: "",
      })
    );
    history.push("/surveys");
  }

  return (
    <div className="border-secondary rounded-xl border-2 p-4">
      <span className="badge badge-secondary badge-lg badge-outline px-4 py-3">
        {HEADERS[page]}
      </span>

      <progress
        className="progress progress-secondary w-full px-5 mt-5"
        value={page}
        max="3"
      />

      {page === 1 && (
        <NewSurvey closeSurvey={closeSurvey} pageNext={pageNext} />
      )}
      {page === 2 && (
        <ReviewSurvey pagePrevious={pagePrevious} pageNext={pageNext} />
      )}

      {page === 3 && (
        <div className="flex justify-center">
          <button className="btn btn-active my-10" onClick={closeSurvey}>
            Return Home
          </button>
        </div>
      )}
    </div>
  );
}
