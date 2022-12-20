import cloneDeep from "lodash/cloneDeep";
import { Color } from "yd-chess-lib";

import * as TYPES from "./types";

const initialState = {
  square_selected: null,
  is_playing: Color.WHITE,
  status: null,
  winner: null,
  modalVisible: false,
};

export default function game(state = initialState, action = {}) {
  const newState = cloneDeep(state);
  switch (action.type) {
    case TYPES.INITIALIZE_BOARD:
      return initialState;
    case TYPES.SET_SQUARE_SELECTED:
      return { ...newState, square_selected: action.value };
    case TYPES.SWITCH_PLAYER:
      return { ...newState, is_playing: state.is_playing === Color.WHITE ? Color.BLACK : Color.WHITE };
    case TYPES.SET_STATUS:
      return { ...newState, status: action.value };
    case TYPES.SET_WINNER:
      return { ...newState, winner: action.value };
    case TYPES.SET_MODAL_VISIBLE:
      return { ...newState, modalVisible: action.value };
    default:
      return state;
  }
}
