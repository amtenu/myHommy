/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export default function Main() {
  //To do , when logged in , hide login and regster
  //remove saved data
  //redirect to login
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  //Check if we have a logged in user
  //apply to the links and use to logout
  const loggedIn =
    auth.user !== null && auth.token !== " " && auth.refreshToken !== " ";

  const handlePostAd = () => {
    if (loggedIn) {
      navigate("/ad/create");
    } else {
      navigate("login");
    }
  };

  return (
    <nav className="nav d-flex justify-content-between lead">
      <NavLink className="nav-link " aria-current="page" to="/">
        Home
      </NavLink>
      <NavLink className="nav-link " aria-current="page" to="/search">
        Search
      </NavLink>
      <NavLink className="nav-link " aria-current="page" to="/buy">
        Buy
      </NavLink>
      <NavLink className="nav-link " aria-current="page" to="/rent">
        Rent
      </NavLink>
      <NavLink className="nav-link " aria-current="page" to="/Agents">
        Agents
      </NavLink>

      <a className="nav-link pointer" onClick={handlePostAd}>
        Post Ad
      </a>
      {!loggedIn ? (
        <>
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>

          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
        </>
      ) : (
        ""
      )}
      {loggedIn ? (
        <div className="dropdown">
          <li>
            <a
              className="nav-link dropdown-toggle pointer"
              data-bs-toggle="dropdown"
            >
              {auth?.user?.name ? auth.user.name : auth?.user?.username}
            </a>
            <ul className="dropdown-menu">
              <li>
                <NavLink className="nav-link " to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <a onClick={logout} className="nav-link">
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}
