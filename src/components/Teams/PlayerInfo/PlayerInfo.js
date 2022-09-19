import React, { useContext, useEffect } from "react";
import "./PlayerInfo.css";
import { Container, Stack } from "@mui/material";
import pic from "../../images/india-1617463_1280.png";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../Context";
import records from "../../../SportsMania.json";

const PlayerInfo = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  let teamLoc = location.pathname.split("/")[3].replaceAll("-", " ");
  //   console.log(teamLoc);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("email");

    if (!user) {
      localStorage.removeItem("email");
      navigate("/");
    }
  }, [navigate]);

  let players;
  if (auth.player) {
    players = records.filter((record) => record.NAME === `${auth.player}`);
  } else {
    players = records.filter(
      (record) => record.NAME.toLowerCase() === `${teamLoc}`
    );
  }

  console.log(players);

  return (
    <>
      <Container className="gridP">
        <div className="header">
          <h2>OVERVIEW</h2>
        </div>
        <Stack
          className="stack"
          spacing={{ xs: 1, sm: 2, md: 4 }}
          direction={{ xs: "column", sm: "row" }}
        >
          <div className="detailItem">
            <span>FULL NAME</span>
            <h3>{players[0]["NAME"] || "Not Found!"}</h3>
          </div>
          <div className="detailItem">
            <span>BORN</span>
            <h3>{players[0]["Born"] || "Not Found!"}</h3>
          </div>
          <div className="detailItem">
            <span>AGE</span>
            <h3>{players[0]["Current age"] || "Not Found!"}</h3>
          </div>
        </Stack>
        <Stack
          className="stack2"
          spacing={{ xs: 1, sm: 2, md: 4 }}
          direction={{ xs: "column", sm: "row" }}
        >
          <div className="detailItem">
            <span>BATTING STYLE</span>
            <h3>{players[0]["Batting style"] || "Not Found!"}</h3>
          </div>
          <div className="detailItem">
            <span>BOWLING STYLE</span>
            <h3>{players[0]["Bowling style"] || "Not Found!"}</h3>
          </div>
          <div className="detailItem">
            <span>PLAYING ROLE</span>
            <h3>{players[0]["Playing role"] || "Not Found!"}</h3>
          </div>
        </Stack>
        <div className="stack3">
          <div>
            <span>TEAMS</span>
          </div>
          <div className="teams">
            {players.map((item, i) => (
              <div className="innerP" key={i}>
                <img src={pic} alt="team" width={30} height={20} />
                <h3 className="innerTeam">
                  {item["Major teams"] || "Not Found!"}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default PlayerInfo;
