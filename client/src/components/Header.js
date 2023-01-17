import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
          <div className="flex gap-2">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={auth.displayPictureLink} alt={auth.displayName} />
              </div>
            </label>
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
