import { PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="bg-red-600 h-14 w-14 rounded-full	fixed bottom-20 right-40">
        <Link to="/surveys/new">
          <PlusIcon className="p-2.5 text-white" />
        </Link>
      </div>
    </div>
  );
}
