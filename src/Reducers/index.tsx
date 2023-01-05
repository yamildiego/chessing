import { combineReducers } from "redux";
import game from "./game";
import config from "./config";
import match from "./match";
import visual from "./visual";
import online from "./online";

export default combineReducers({
  game,
  config,
  match,
  visual,
  online,
});
