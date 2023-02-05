import { PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import SurveyList from "./SurveyList";

export default function Dashboard() {
  return (
    <div>
      <h2 className="my-7 text-center">Dashboard</h2>
      <SurveyList />
      <div className="bg-base-300 dark:bg-secondary h-14 w-14 rounded-full drop-shadow-2xl fixed lg:bottom-20 lg:right-40 bottom-10 right-10">
        <Link to="/surveys/new">
          <PlusIcon className="p-2.5  text-gray-700 dark:text-white" />
        </Link>
      </div>
    </div>
  );
}
