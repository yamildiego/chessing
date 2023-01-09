import cloneDeep from "lodash/cloneDeep";
import { Color } from "yd-chess-lib";

import * as TYPES from "./types";

const initialState = {
  square_selected: null,
  is_playing: Color.WHITE,
  piece_moved: null,
  data_finished: { status: null, winner: null, modal_visible: false },
  offer_a_draw: false,
  ask_for_resign: false,
  pawn_promotion_position: null,
};

export default function game(state = initialState, action: { type: string; value: any }) {
  const newState = cloneDeep(state);
  switch (action.type) {
    case TYPES.INITIALIZE_BOARD:
      return initialState;
    case TYPES.SET_SQUARE_SELECTED:
      return { ...newState, square_selected: action.value };
    case TYPES.SWITCH_PLAYER:
      return { ...newState, is_playing: state.is_playing === Color.WHITE ? Color.BLACK : Color.WHITE };
    case TYPES.SET_PLAYER:
      return { ...newState, is_playing: action.value };
    case TYPES.SET_PIECE_MOVED:
      return { ...newState, piece_moved: action.value };
    case TYPES.SET_DATA_FINISHED:
      return { ...newState, data_finished: { ...state.data_finished, ...action.value } };
    case TYPES.SET_OFFER_A_DRAW:
      return { ...newState, offer_a_draw: action.value };
    case TYPES.SET_ASK_FOR_RESIGN:
      return { ...newState, ask_for_resign: action.value };
    case TYPES.SET_PAWN_PROMOTION_POSITION:
      return { ...newState, pawn_promotion_position: action.value };
    default:
      return state;
  }
}
