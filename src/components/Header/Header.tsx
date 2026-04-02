import { NavLink, Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo">
          <Link to="/">
            <img src={`${import.meta.env.BASE_URL}vin_logo.png`} alt="Logo" />
          </Link>
        </div>
        <div className="header__nav">
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Decoder
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/variables"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Variables
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
