import cloneDeep from "lodash/cloneDeep";
import * as TYPES from "./types";

let row = { a: null, b: null, c: null, d: null, e: null, f: null, g: null, h: null };
let board = { 8: row, 7: row, 6: row, 5: row, 4: row, 3: row, 2: row, 1: row };

const initialState = {
  board,
  selected: null,
  show_legal_moves: true,
  time_per_player: 600000,
  is_playing: "W",
};

export default function game(state = initialState, action = {}) {
  const newState = cloneDeep(state);
  switch (action.type) {
    case TYPES.SET_SELECTED:
      return { ...newState, selected: action.value };
    case TYPES.SET_TIME_PER_PLAY:
      return { ...newState, time_per_player: action.value };
    case TYPES.SET_SHOW_LEGAL_MOVES:
      return { ...newState, show_legal_moves: action.value };
    case TYPES.SWITCH_PLAYER:
      return { ...newState, is_playing: state.is_playing === "W" ? "B" : "W" };
    case TYPES.INITIALIZE_CONFIG:
      return { ...newState, selected: null, show_legal_moves: true, time_per_player: 600000, is_playing: "W" };
    case TYPES.INITIALIZE_BOARD:
      return { ...newState, is_playing: "W", selected: null };
    default:
      return state;
  }
}
