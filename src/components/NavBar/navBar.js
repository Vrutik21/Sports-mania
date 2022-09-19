import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./navBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("email");
    return navigate("/");
  };

  return (
    <>
      <div className="navBar">
        <div className="backbtn" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </div>
        <div className="h2">
          <h2>Sports Mania</h2>
        </div>
        {localStorage.getItem("email") ? (
          <>
            {/* <div>
              <input
                type="text"
                id="mySearch"
                onChange={(e) => auth.searchQuery(e)}
                placeholder="Search"
                title="Type in a country/player name"
              ></input>
            </div> */}
            <button
              className="logout"
              type="button"
              onClick={() => logoutHandler()}
            >
              Logout
            </button>
          </>
        ) : (
          <div className="h3">
            <h3>Welcome guest</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
