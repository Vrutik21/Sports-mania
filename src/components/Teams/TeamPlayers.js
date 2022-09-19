import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import records from "../../SportsMania.json";
import pic from "../images/avatar-1577909_1280.png";
import "./teams.css";
import { useContext } from "react";
import AuthContext from "../Context";
import { useLocation } from "react-router-dom";

const TeamPlayers = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  let teamLoc = location.pathname.split("/")[2].replaceAll("-", " ");
  // console.log(teamLoc);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("email");

    if (!user) {
      localStorage.removeItem("email");
      navigate("/");
    }
  }, [navigate]);

  let filters = [
    "ALL",
    "Test",
    "ODI",
    "T20I",
    "WTEST",
    "WODI",
    "WT20I",
    "T20",
    "Allrounders",
    "Batters",
    "Bowlers",
    "WKs",
  ];

  let country;
  if (auth.team) {
    country = records.filter((record) => record.COUNTRY === `${auth.team}`);
  } else {
    country = records.filter(
      (record) => record.COUNTRY.toLowerCase() === `${teamLoc}`
    );
  }

  let age = country.filter((item) => item["Current age"].slice(0, 2));

  const [data, setData] = useState(age);
  const [itemId, setItemId] = useState();
  const [filterId, setFilterId] = useState();
  const [allId, setAllId] = useState(false);

  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  // console.log(alphabet);

  const activeHandler = () => {
    setData(age);
    let doc = document.querySelector(".active");
    doc.style.borderBottom = "4px solid rgb(12, 140, 182)";
    let doc2 = document.querySelectorAll(".border");
    doc2.forEach((ele) => (ele.style.borderBottom = "none"));
  };

  const filterHandler = (letter, i) => {
    let filteredArray = country.filter(
      (item) => item["NAME"].slice(0, 1) === letter
    );
    setData(filteredArray);

    if (itemId) {
      let doc2 = document.querySelectorAll(".border");
      doc2[itemId].style.borderBottom = "none";
    }
    document.querySelector(".border").style.borderBottom = "none";

    document.querySelector(".active").style.borderBottom = "none";
    let doc2 = document.querySelectorAll(".border");
    doc2[i].style.borderBottom = "4px solid rgb(12, 140, 182)";
    setItemId(i);
  };

  const sortHandler = () => {
    document.querySelector(".filter-1").style.backgroundColor =
      "rgb(12, 140, 182)";
    document.querySelector(".filter-1").style.color = "white";
    let doc3 = document.querySelectorAll(".filters");
    doc3.forEach((ele) => (ele.style.backgroundColor = "transparent"));
    doc3.forEach((ele) => (ele.style.color = "black"));
    setAllId(false);
  };

  const sortHandler2 = (id) => {
    setAllId(true);
    document.querySelector(".filter-1").style.backgroundColor = "transparent";
    document.querySelector(".filter-1").style.color = "black";
    if (filterId) {
      let doc2 = document.querySelectorAll(".filters");
      doc2[filterId].style.backgroundColor = "transparent";
      doc2[filterId].style.color = "black";
    }
    document.querySelector(".filters").style.backgroundColor = "transparent";
    document.querySelector(".filters").style.color = "black";
    let doc3 = document.querySelectorAll(".filters");
    doc3[id].style.backgroundColor = "rgb(12, 140, 182)";
    doc3[id].style.color = "white";
    setFilterId(id);
  };

  // console.log(data);

  return (
    <>
      <div className="container">
        <div className="grid">
          <div className="gridHeader">
            <p>{`${country[0]["COUNTRY"]} Players`}</p>
          </div>
          <div className="gridHeader">
            <button className="active" onClick={() => activeHandler()}>
              <h3>Active Players</h3>
            </button>
            <div id="borderLeft"></div>
            <div className="alphabet">
              {alphabet.map((x, i) => (
                <span className="border" key={i}>
                  <button
                    className="item"
                    key={i}
                    onClick={() => filterHandler(x, i)}
                  >
                    {x}
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="gridHeader">
            <div className="alphabet">
              <button className="filter-1" onClick={() => sortHandler()}>
                INTL
              </button>
              {filters.map((x, i) => (
                //Only INTL and All is functional,other is not coz there was no data matching it
                <button
                  className="filters"
                  key={i}
                  onClick={() => sortHandler2(i)}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>
          <div className="gridContainer">
            {allId &&
              country.map((record, index) => (
                <div className="gridItem" key={index}>
                  <div
                    className="inner2"
                    onClick={() =>
                      auth.playerHandler(record.replaceAll(" ", "-"))
                    }
                  >
                    <img src={pic} alt="player" />
                  </div>
                  <div className="details">
                    <h3
                      className="high"
                      onClick={() =>
                        auth.playerHandler(record.replaceAll(" ", "-"))
                      }
                    >
                      {record.NAME}
                    </h3>
                    <span>{record["Full name"]}</span> <br />
                    <span>Age: {record["Current age"] || "Not available"}</span>
                  </div>
                </div>
              ))}
            {data[0] &&
              data?.map((record, index) => (
                <div className="gridItem" key={index}>
                  <div
                    className="inner2"
                    onClick={() => auth.playerHandler(record.NAME)}
                  >
                    <img src={pic} alt="player" />
                  </div>
                  <div className="details">
                    <h3
                      className="high"
                      onClick={() => auth.playerHandler(record.NAME)}
                    >
                      {record.NAME}
                    </h3>
                    <span>{record["Full name"]}</span> <br />
                    <span>Age: {record["Current age"] || "Not available"}</span>
                  </div>
                </div>
              ))}
          </div>
          {!data[0] && (
            <div
              style={{
                border: "none",
              }}
              className="gridHeader"
            >
              <p>No data found!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TeamPlayers;
