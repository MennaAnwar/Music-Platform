import { useContext, useState } from "react";
import "./userDropDown.css";
import Context from "../../Context";
import { Link } from "react-router-dom";

export default function Dropdown() {
  const [active, setActive] = useState(false);

  const {
    logged_in,
    setLoggedIn,
    userData,
    setUserData,
    setCookie,
    removeCookie,
  } = useContext(Context);

  const handleClick = () => {
    setActive(!active);
  };

  const logout = () => {
    setLoggedIn((logged_in) => !logged_in);
    setCookie("rememberMe", false, {
      path: "/",
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });
    setUserData({ user_id: "", name: "", email: "", password: "" });
    for (const key in userData) {
      removeCookie(key, { path: "/" });
    }
  };

  return (
    <div className="User-area">
      <div className="User-avtar" onClick={handleClick}>
        <div className="circle">
          <span>{userData.name[0]}</span>
        </div>
      </div>
      <ul className={!active ? "User-Dropdown" : "User-Dropdown U-open"}>
        <li>
          <Link to="/playlists">MY Playlists</Link>
        </li>
        <li>
          <Link to="/membership" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
