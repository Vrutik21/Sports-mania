import "./App.css";
import Login from "./components/Login/login";
import NavBar from "./components/NavBar/navBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import TeamPage from "./components/Teams/TeamPage";
import TeamPlayers from "./components/Teams/TeamPlayers";
import BackToTop from "./components/BackToTop/BackToTop";
import { useState } from "react";
import AuthContext from "./components/Context";
import PlayerInfo from "./components/Teams/PlayerInfo";

function App() {
  const navigate = useNavigate();
  const [team, setTeam] = useState();
  const [player, setPlayer] = useState();

  const clickHandler = (id) => {
    setTeam(id);
    return navigate(`/team/${id.toLowerCase().replaceAll(" ", "-")}`);
  };

  const playerHandler = (id) => {
    setPlayer(id);
    return navigate(`/team/player/${id.toLowerCase().replaceAll(" ", "-")}`);
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          team: team,
          clickHandler: clickHandler,
          player: player,
          playerHandler: playerHandler,
        }}
      >
        <NavBar />
        <BackToTop />
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/team" exact element={<TeamPage />} />
          <Route path="/team/:id" exact element={<TeamPlayers />} />
          {/* <Route path="/team/west-indies" exact element={<TeamPlayers />} />
          <Route path="/team/south-africa" exact element={<TeamPlayers />} /> */}
          <Route path="/team/player/:id" exact element={<PlayerInfo />}></Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
