import { combineReducers } from "redux";
import game from "./game";
import config from "./config";
import match from "./match";

export default combineReducers({
  game,
  config,
  match,
});
