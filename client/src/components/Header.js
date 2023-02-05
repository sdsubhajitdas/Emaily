import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Payment from "./Payment";
import ThemeToggler from "./ThemeToggler";

export default function Header() {
  const auth = useSelector((state) => state.auth.value);

  function renderContent() {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <div className="flex-none">
            <a href="/auth/google" className="btn md:btn-md btn-sm">
              Login with Google
            </a>
          </div>
        );
      default:
        return (
          <div className="flex-none gap-3">
            <Payment />
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-12 rounded-full">
                  <img src={auth.displayPictureLink} alt={auth.displayName} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow-2xl menu menu-compact dropdown-content bg-primary rounded-box w-52 text-white"
              >
                <li>
                  <div className="justify-between">
                    Credits
                    <span className="badge">{auth.credits}</span>
                  </div>
                </li>
                <li>
                  <a href="/api/logout">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        );
    }
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link
          className="btn btn-ghost normal-case md:text-5xl text-4xl"
          to={auth ? "/surveys" : "/"}
        >
          Emaily
        </Link>
      </div>
      {renderContent()}
      <ThemeToggler />
    </div>
  );
}
