import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TeamPage.css";
import records from "../../../SportsMania.json";
import england from "../../images/union-jack-1027898_1280.jpg";
import southAfrica from "../../images/south-africa-162425_1280.png";
import westIndies from "../../images/west-indies-cricket-team-logo-1280x720-1.jpg";
import { useContext } from "react";
import AuthContext from "../../Context";

const TeamPage = () => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  let arr = records
    .map((item) => item.COUNTRY)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort();
  console.log(arr);

  useEffect(() => {
    const user = localStorage.getItem("email");

    if (!user) {
      localStorage.removeItem("email");
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="container">
        <div className="grid">
          <div className="grid-header">
            <p>POPULAR INTERNATIONAL TEAMS</p>
          </div>
          <div className="grid-container">
            {arr.map((record, index) => (
              <div
                className="grid-item-team"
                key={index}
                onClick={() => auth.clickHandler(record)}
              >
                <div className="inner">
                  {record === "England" && (
                    <img src={england} alt="flag" width="50" height="30" />
                  )}
                  {record === "South Africa" && (
                    <img src={southAfrica} alt="flag" width="50" height="30" />
                  )}
                  {record === "West Indies" && (
                    <img src={westIndies} alt="flag" width="50" height="32" />
                  )}
                  <h3>{record}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamPage;
