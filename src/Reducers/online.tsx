import cloneDeep from "lodash/cloneDeep";
import * as TYPES from "./types";

const initialState = {
  is_loading: false,
  code: null,
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
    default:
      return state;
  }
}
