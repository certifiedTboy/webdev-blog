import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import { getUserProfilePicture } from "../../../lib/generaRequestRedux/profileActions";
import classes from "./MainNav.module.css";

const MainNavigation = ({ scrollTop }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  const { success } = useSelector((state) => state.request);
  const { currentUserProfilePicture } = useSelector((state) => state.profile);

  useEffect(() => {
    const onGetProfilePicture = async () => {
      dispatch(getUserProfilePicture());
    };

    if (user) {
      onGetProfilePicture();
    }
  }, [user, dispatch, success.successType]);

  return (
    <div
      className={`navbar navbar-expand-lg  navbar-light  ${
        scrollTop > 0 ? `nav-sticky` : ""
      }`}
    >
      <div className="container-fluid">
        <a href="/" className="navbar-brand bra">
          WebDev Blog
        </a>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarCollapse"
        >
          <div className="navbar-nav ml-auto">
            <NavLink
              activeClass="active"
              className={`nav-item nav-link ${classes.mousePoint} active`}
              to="/home"
            >
              Home
            </NavLink>

            <NavLink
              activeClass="active"
              className={`nav-item nav-link ${classes.mousePoint}`}
              to="/about"
            >
              About
            </NavLink>

            <NavLink
              activeClass="active"
              className={`nav-item nav-link ${classes.mousePoint}`}
              to="/blogs"
            >
              Blogs
            </NavLink>

            <Link
              activeClass="active"
              className={`nav-item nav-link ${classes.mousePoint}`}
              to="contact"
              spy={true}
              smooth={true}
              hashSpy={true}
              duration={500}
              delay={500}
              isDynamic={true}
              ignoreCancelEvents={false}
              spyThrottle={500}
            >
              Contact
            </Link>
          </div>
          {!user && (
            <li class={`nav-link nav-item dropdown`}>
              <NavLink
                className={`${classes.dropDownLink} dropdown-toggle`}
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Login
              </NavLink>

              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/login">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/signup">
                    Signup
                  </NavLink>
                </li>
              </ul>
            </li>
          )}
          <form className="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>

          {user && (
            <li class={`nav-link nav-item dropdown`}>
              <NavLink
                className={`${classes.dropDownLink} dropdown-toggle`}
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={`http://localhost:3001/${currentUserProfilePicture}`}
                  alt="profile_picture"
                />
              </NavLink>

              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="dropdown-item"
                    to={`/w-d/${user.username}`}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/signout">
                    Signout
                  </NavLink>
                </li>
              </ul>
            </li>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
