import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Payment from "./Payment";

export default function Header() {
  const auth = useSelector((state) => state.auth.value);

  function renderContent() {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <a href="/auth/google" className="btn">
            Login with Google
          </a>
        );
      default:
        return (
          <div className="flex gap-3">
            <h4 className="p-2 italic font-medium">Credits: {auth.credits}</h4>
            <Payment />
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={auth.displayPictureLink} alt={auth.displayName} />
              </div>
            </div>
            <a href="/api/logout" className="btn">
              Logout
            </a>
          </div>
        );
    }
  }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link
          className="btn btn-ghost normal-case text-5xl"
          to={auth ? "/surveys" : "/"}
        >
          Emaily
        </Link>
      </div>
      <div className="navbar-end ">{renderContent()}</div>
    </div>
  );
}
