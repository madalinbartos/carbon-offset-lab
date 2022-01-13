import { Component } from "react";
import { Link } from "react-router-dom";

import IUser from "../types/user.type";

type Props = { currentUser: IUser | undefined; handleLogOut: () => void };

type State = {};

export default class Navbar extends Component<Props, State> {
  render() {
    const { currentUser, handleLogOut } = this.props;

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link to={"/"} className="navbar-brand">
              Carbon Offset Lab
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {currentUser && (
                  <Link to={"/new-project"}>
                    <button
                      className="btn btn-success rounded-0 shadow-none"
                      onClick={(event) => event.currentTarget.blur()}
                    >
                      Create a new project
                    </button>
                  </Link>
                )}
              </ul>
              {currentUser && (
                <div className="d-flex mx-2">
                  <div className="text-white">
                    <span>Hello, {currentUser.username}</span>
                  </div>
                </div>
              )}
              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <button
                      className="btn btn-danger rounded-0"
                      onClick={handleLogOut}
                    >
                      Log out
                    </button>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link text-white">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link text-white">
                      Register
                    </Link>
                  </li>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
