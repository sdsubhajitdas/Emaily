import { useSelector } from "react-redux";
import ReviewSurveyField from "./ReviewSurveyField";

export default function ReviewSurvey({ pagePrevious, sendSurvey }) {
  const FORM_FIELD_DETAILS = [
    {
      label: "Survey Title",
      name: "title",
      elementType: "input",
    },
    {
      label: "Subject Line",
      name: "subject",
      elementType: "input",
    },
    {
      label: "Email Body",
      name: "body",
      elementType: "textarea",
    },
    {
      label: "Recipient List",
      name: "recipients",
      placeholder: "Use comma to separate email addresses",
      elementType: "email",
    },
  ];
  const reviewValues = useSelector((state) => state.surveyForm.value);

  function getFormInputFields(fieldDetails) {
    return fieldDetails.map((field) => {
      return (
        <ReviewSurveyField
          label={field.label}
          elementType={field.elementType}
          value={reviewValues[field.name]}
          key={field.name}
        />
      );
    });
  }

  return (
    <div className="form-control">
      {getFormInputFields(FORM_FIELD_DETAILS)}
      <div className="flex justify-between">
        <button
          className="btn btn-error my-5 dark:text-white"
          onClick={pagePrevious}
        >
          Back
        </button>

        <button
          className="btn btn-success my-5 dark:text-white"
          onClick={sendSurvey}
        >
          Send Survey
        </button>
      </div>
    </div>
  );
}
