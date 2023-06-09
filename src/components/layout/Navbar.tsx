import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";

export default function Navbar() {
  const { authData } = useContext(AuthContext);
  const navigation = useNavigate();

  const handleClick = async () => {
    localStorage.setItem("authToken", "");
    navigation("/login");
  };

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      {/* <!-- Navbar Brand--> */}
      <Link className="navbar-brand ps-3" to="/" style={{ fontWeight: "bold" }}>
        CHATDY
      </Link>
      <Link className="nav-link text-muted" to="/chat" style={{ marginRight: "30px" }}>
        Chat With Human
      </Link>
      <Link className="nav-link text-muted" to="/chatai">
        Chat With AI
      </Link>
      {/* <!-- Sidebar Toggle--> */}
      {/* <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
      >
        <i className="fas fa-bars"></i>
      </button> */}
      <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></div>
      {/* <!-- Navbar--> */}
      <span className="text-muted">{`${authData?.first_name} ${authData?.last_name}`}</span>
      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user fa-fw"></i>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <a className="dropdown-item" href="#!">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#!">
                Activity Log
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" onClick={handleClick}>
                Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
