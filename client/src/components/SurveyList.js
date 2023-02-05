import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setSurvey } from "../reducers/surveyReducer";
import SurveyCard from "./SurveyCard";

export default function SurveyList() {
  const surveys = useSelector((state) => state.survey.value);
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    axios
      .get("/api/surveys", { cancelToken: cancelToken.token })
      .then((response) => {
        setTriggerRefresh(false);
        dispatch(setSurvey(response.data));
      })
      .catch((err) => {
        if (!axios.isCancel(err)) console.error(err);
      });

    return () => {
      cancelToken.cancel();
    };
  }, [dispatch, triggerRefresh]);

  async function deleteSurvey(surveyId) {
    await axios.delete(`/api/survey/${surveyId}`);
    setTriggerRefresh(true);
  }

  function renderContent(surveys) {
    return surveys.map((survey) => (
      <SurveyCard
        survey={survey}
        key={survey._id}
        deleteSurvey={deleteSurvey}
      />
    ));
  }

  if (surveys === null) {
    return (
      <div>
        <h3>Loading</h3>
      </div>
    );
  } else {
    return (
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5">
        {renderContent(surveys)}
      </div>
    );
  }
}
