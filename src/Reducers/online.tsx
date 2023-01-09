import cloneDeep from "lodash/cloneDeep";
import * as TYPES from "./types";

const initialState = {
  is_loading: false,
  code: null,
  on_progress: false,
  main_player_color: null,
  piece_moved: null,
  animating: false,
  status: {
    players: [],
    history: [],
    last_movement: null,
  },
};

export default function online(state = initialState, action: { type: string; value: any }) {
  const newState = cloneDeep(state);
  switch (action.type) {
    case TYPES.INITIALIZE_GAME_ONLINE:
      return initialState;
    case TYPES.SET_IS_LOADING:
      return { ...newState, is_loading: action.value };
    case TYPES.SET_CODE_ONLINE:
      return { ...newState, code: action.value };
    case TYPES.SET_STATUS:
      return { ...newState, status: action.value };
    case TYPES.SET_ON_PROGRESS:
      return { ...newState, on_progress: action.value };
    case TYPES.SET_MAIN_PLAYER_COLOR:
      return { ...newState, main_player_color: action.value };
    case TYPES.SET_PIECE_MOVED_ONLINE:
      return { ...newState, piece_moved: action.value };
    case TYPES.SET_ANIMATING:
      return { ...newState, animating: action.value };
    default:
      return state;
  }
}
