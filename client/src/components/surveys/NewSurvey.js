import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { setFormValues } from "../../reducers/surveyFormReducer";
import SurveyField from "../surveys/SurveyField";
import emailValidationSchema from "../../utils/emailValidationSchema";

export default function NewSurvey({ pageNext }) {
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
      elementType: "input",
    },
  ];
  const dispatch = useDispatch();
  const initialValues = useSelector((state) => state.surveyForm.value);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(emailValidationSchema()),
  });

  function getFormInputFields(fieldDetails) {
    return fieldDetails.map((field) => {
      return (
        <SurveyField
          label={field.label}
          name={field.name}
          placeholder={field.placeholder}
          elementType={field.elementType}
          error={!errors[field.name] ? "" : errors[field.name].message}
          register={{ ...register(field.name) }}
          key={field.name}
        />
      );
    });
  }

  function onSubmit(data) {
    // Preprocessing steps on recipients to make UI look good.
    // Removed all trailing spaces and removed duplicate emails.
    data.recipients = Array.from(
      new Set(
        data.recipients
          .split(",")
          .map((email) => email.trim())
          .filter((email) => email !== null && email !== "")
      )
    ).join(",");
    dispatch(setFormValues(data));
    pageNext();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-control">
      {getFormInputFields(FORM_FIELD_DETAILS)}
      <div className="flex justify-between">
        <Link to="/surveys">
          <button className="btn btn-error my-5 dark:text-white">Cancel</button>
        </Link>

        <button className="btn btn-success my-5 dark:text-white" type="submit">
          Next
        </button>
      </div>
    </form>
  );
}
