import cloneDeep from "lodash/cloneDeep";
import * as TYPES from "./types";

const initialState = {
  show_legal_moves: true,
  time_per_player: 600000,
  flip: "board",
  is_loading: false,
  code: null,
};

export default function config(state = initialState, action: { type: string; value: any }) {
  const newState = cloneDeep(state);
  switch (action.type) {
    case TYPES.INITIALIZE_CONFIG:
      return initialState;
    case TYPES.SET_SHOW_LEGAL_MOVES:
      return { ...newState, show_legal_moves: action.value };
    case TYPES.SET_FLIP:
      return { ...newState, flip: action.value };
    case TYPES.SET_TIME_PER_PLAY:
      return { ...newState, time_per_player: action.value };
    case TYPES.SET_IS_LOADING:
      return { ...newState, is_loading: action.value };
    default:
      return state;
  }
}
