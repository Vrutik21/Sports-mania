import { createContext } from "react";

const AuthContext = createContext({
  team: "",
  player: "",
  searchData: [],
  clickHandler: (id) => {},
  playerHandler: (id) => {},
});

export default AuthContext;
